export type SegmentName = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g1' | 'g2' | 'h' | 'i' | 'j' | 'k' | 'l' | 'm';
export type SegmentCodeKey =
  | '0'
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | 'A'
  | 'B'
  | 'C'
  | 'D'
  | 'E'
  | 'F'
  | 'G'
  | 'H'
  | 'I'
  | 'J'
  | 'K'
  | 'L'
  | 'M'
  | 'N'
  | 'O'
  | 'P'
  | 'Q'
  | 'R'
  | 'S'
  | 'T'
  | 'U'
  | 'V'
  | 'W'
  | 'X'
  | 'Y'
  | 'Z';

export type DisplayOptions = {
  convertToUpperCase: string;
  unknownChar: string;
  dense?: number;
};

export type DisplayState = SegmentName[];

type DenseOn = {
  dense: true;
};

type DenseOff = {
  dense: false;
};

type AnimateDisplayOptions = DenseOn | DenseOff;

export type AnimateDisplay = (
  startDisplayState: DisplayState,
  endDisplayState: DisplayState,
  animateDisplayOptions: AnimateDisplayOptions,
) => DisplayState[];

export type EffectOptions = {
  convertToUpperCase?: boolean;
  unknownChar?: string | 'exception';
};

export type DomOptions = {
  templateId: string
  className: string
}

export type SegmentBySegmentOptions = {
  dense?: boolean;
};
export interface Options {
  convertToUpperCase: string;
  unknownChar: string;
  dense?: number
}