import { segmentCodes} from './model';
import { DisplayState, Options, SegmentCodeKey, SegmentName } from './solution';
export function isKnownChar(char: SegmentCodeKey | string) {
    return char in segmentCodes;
}


export function charToDisplay(char: SegmentCodeKey | string, options: Options) {
    console.log(options);
    if (options?.convertToUpperCase) {
        char = char.toUpperCase();
        console.log(char);
    }
    console.log({ char });
    if (!isKnownChar(char)) {
        if (options?.unknownChar === 'exception') {
            throw new Error(`Cannot convert character ${char} to 14-segment display`);
        }
        return options?.unknownChar ?? [];
    }
    return segmentCodes[char];
}
export function stringToDisplay(input: string, options: Options):  DisplayState{
    return [...input].map(c => charToDisplay(c, options));
}
