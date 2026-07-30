// lib/character.js
import { useSyncExternalStore } from "react";

const KEY = "36days:character";

export function setCharacter(id) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, id);
}

export function getCharacter() {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(KEY);
}

export function clearCharacter() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(KEY);
}

function subscribe(callback) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getServerSnapshot() {
  return null;
}

// Reads the chosen character from localStorage without setState-in-effect:
// returns null on the server / before hydration, then the real value on the client.
export function useCharacter() {
  return useSyncExternalStore(subscribe, getCharacter, getServerSnapshot);
}