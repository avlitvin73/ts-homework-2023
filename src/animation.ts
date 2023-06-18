import { segmentNames } from "./model";
import { AnimateDisplay, AnimateDisplayOptions, DisplayState, SegmentBySegmentOptions, SegmentName } from "./solution";
import { clampToLength } from "./utils";



export function transition(
  from: SegmentName[][],
  to: SegmentName[][],
  animateDisplay: AnimateDisplay,
  animateDisplayOptions: AnimateDisplayOptions
): DisplayState[][] {
  from = clampToLength(from, to.length);
  const displayFrames = from.map((startDisplayState, i) => {
    return animateDisplay(startDisplayState, to[i], animateDisplayOptions);
  });
  const maxFrames = Math.max(...displayFrames.map((f) => f.length));
  const frames: DisplayState[][] = [];
  for (let i = 0; i < maxFrames; i += 1) {
    frames.push(displayFrames.map((frames) => frames[i] || frames.at(-1)));
  }
  return frames;
}



export const segmentBySegment: AnimateDisplay = (
  from: DisplayState,
  to: DisplayState,
  options?: SegmentBySegmentOptions
): DisplayState[] => {
  const curState = new Set(from);
  const toState = new Set(to);
  const res = [[...curState]];
  for (const segmentName of segmentNames) {
    const changed = toState.has(segmentName) !== curState.has(segmentName);
    if (!changed && options?.dense) {
      continue;
    }
    if (toState.has(segmentName)) {
      curState.add(segmentName);
    } else {
      curState.delete(segmentName);
    }
    res.push([...curState]);
  }
  return res;
};

const layers: SegmentName[][] = [
  ["a", "b", "c", "d", "e", "f"] as SegmentName[],
  ["h", "j", "k", "m"] as SegmentName[],
  ["i", "l", "g1", "g2"] as SegmentName[],
];

export const layerByLayer: AnimateDisplay = (
  from: DisplayState,
  to: DisplayState,
  options?: SegmentBySegmentOptions
): DisplayState[] => {
  const curState = new Set(from);
  const toState = new Set(to);
  const res = [[...curState]];
  for (const layer of layers) {
    for (const segment of layer) {
      if (options?.dense && !toState.has(segment)) {
        continue;
      }
      curState.add(segment);
    }
    res.push([...curState]);
  }
  for (let i = layers.length - 1; i >= 0; i -= 1) {
    for (const segment of layers[i]) {
      if (!toState.has(segment)) {
        curState.delete(segment);
      }
    }
    res.push([...curState]);
  }
  return res;
};