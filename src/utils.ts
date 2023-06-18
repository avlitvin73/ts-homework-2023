import { DisplayState } from "./solution";

export function clampToLength(state: DisplayState[], length: number):DisplayState[] {
  return state.concat(emptyDisplays(Math.max(0, length - state.length))).slice(0, length);
}
export function emptyDisplays(amount: number) : DisplayState[]{
  return Array.from({ length: amount }, () => []);
}
