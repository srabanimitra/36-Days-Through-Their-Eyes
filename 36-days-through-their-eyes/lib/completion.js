"use client";
import { useEffect, useState } from "react";

const KEY = "36days:completed";
const EVENT_NAME = "36days:completed-changed";

function readCompleted() {
    if (typeof window === "undefined") return [];
    try {
        const raw = window.localStorage.getItem(KEY);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
}

function writeCompleted(list) {
    try {
        window.localStorage.setItem(KEY, JSON.stringify(list));
        window.dispatchEvent(new Event(EVENT_NAME));
    } catch {
        // best-effort only — completion tracking isn't critical path
    }
}

export function markCharacterCompleted(characterId) {
    if (!characterId) return;
    const current = readCompleted();
    if (!current.includes(characterId)) {
        writeCompleted([...current, characterId]);
    }
}

export function resetCompletion() {
    writeCompleted([]);
}

// Returns the array of completed character ids, live-updating on change
// (including same-tab changes, since the native 'storage' event only
// fires across tabs).
export function useCompletedCharacters() {
    const [completed, setCompleted] = useState([]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCompleted(readCompleted());
        function handleChange() {
            setCompleted(readCompleted());
        }
        window.addEventListener(EVENT_NAME, handleChange);
        window.addEventListener("storage", handleChange);
        return () => {
            window.removeEventListener(EVENT_NAME, handleChange);
            window.removeEventListener("storage", handleChange);
        };
    }, []);

    return completed;
}