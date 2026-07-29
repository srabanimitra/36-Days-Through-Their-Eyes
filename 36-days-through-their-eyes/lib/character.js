// lib/character.js
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