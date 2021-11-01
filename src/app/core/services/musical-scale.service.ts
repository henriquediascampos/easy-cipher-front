import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FormatMusicService } from './format-musica.service';

export type Scale =
    | 'C'
    | 'C#'
    | 'D'
    | 'Eb'
    | 'E'
    | 'F'
    | 'F#'
    | 'G'
    | 'Ab'
    | 'A'
    | 'Bb'
    | 'B';
export type Note = 'C' | 'D' | 'E' | 'F' | 'G' | 'A' | 'B';
export type NoteIncrement =
    | 'M'
    | 'm'
    | '7'
    | '7+'
    | '9'
    | '11'
    | '/'
    | 'SUS'
    | '°'
    | 'ø'
    | '5+';

export interface MatchChord {
    name: string;
    chordName: string;
    catchphrase: string;
    chordInversion: boolean;
    scale: Scale[];
    composition: Scale[];
    major: boolean;
    minor: boolean;
    sus: boolean;
    seventh: boolean;
    seventhMajor: boolean;
    ninth: boolean;
    eleventh: boolean;
    thirteenth: boolean;
    diminished: boolean;
    looseEnds: Scale[];
    omittedFifth: boolean;
    probability: number;
}

@Injectable()
export class MusicalScaleService {
    scale: Scale[] = [
        'C',
        'C#',
        'D',
        'Eb',
        'E',
        'F',
        'F#',
        'G',
        'Ab',
        'A',
        'Bb',
        'B',
    ];
    majorMusicalScale = [0, 2, 4, 5, 7, 9, 11];
    minorMusicalScale = [0, 2, 3, 5, 7, 8, 10];

    A = ['E', 'F#', 'Ab', 'A', 'B', 'C#', 'Eb'];

    constructor(private split: FormatMusicService) {}

    getAllTones(): Observable<string[]> {
        return of([...this.scale, ...this.scale.map(tone => tone+'m')]).pipe(
            map(tone => {
                console.log(tone);
                return tone.sort()
            })
        );
    }

    async backTone(currentNote: Note): Promise<string> {
        return this.backNote(currentNote);
    }

    async nextTone(currentNote: Scale): Promise<string> {
        return this.nextNote(currentNote);
    }

    private nextNote(currentNote: Scale): string {
        const { index, increment } = this.getIndex(currentNote);
        return this.next(index) + increment;
    }

    private next(index: number): string {
        if (index === this.scale.length - 1) {
            return this.scale[0];
        }
        return this.scale[index + 1];
    }

    private backNote(currentNote: string): string {
        const { index, increment } = this.getIndex(currentNote);
        return this.back(index) + increment;
    }

    private back(index: number): string {
        if (index === 0) {
            return this.scale[this.scale.length - 1];
        }
        return this.scale[index - 1];
    }

    private getIndex(currentNote: string): {
        index: number;
        increment: string;
    } {
        const note = currentNote.replace(/M|m|7|9|\(|\)/g, '');
        const increment = currentNote.replace(/[^(M|m|7|9|\(|\))]/g, '');
        const index = this.scale.indexOf(note as Note);

        return { index, increment };
    }

    private change(currentNote: string, moveHouse: number): string {
        const { index, increment } = this.getIndex(currentNote);
        if (index + moveHouse >= this.scale.length) {
            return (
                this.scale[index + moveHouse - this.scale.length] + increment
            );
        }
        return this.scale[index + moveHouse] + increment;
    }

    changeTone(notes: string, origemTone: string, currentTone: string): string {
        const origemToneIndex = this.scale.indexOf(origemTone as any);
        const currentToneIndex = this.scale.indexOf(currentTone as any);
        const changeValue = -(origemToneIndex - currentToneIndex);

        return this.split
            .splitLine(notes)
            .map((char: string) => {
                if (char && char.trim()) {
                    return char.split('/').reduce((accu, curr) => {
                        if (accu) {
                            accu += '/';
                        }
                        accu += this.change(curr as Note, changeValue);
                        return accu;
                    }, '');
                }

                return char;
            })
            .reduce((accu, curr) => accu + (curr || ''));
    }

    changeNotes(notes: string, change: 'back' | 'next'): string {
        return this.split
            .splitLine(notes)
            .map((char: string) => {
                if (char && char.trim()) {
                    return char.split('/').reduce((accu, curr) => {
                        if (accu) {
                            accu += '/';
                        }

                        accu +=
                            change === 'back'
                                ? this.backNote(curr as Note)
                                : this.nextNote(curr as Note);
                        return accu;
                    }, '');
                }

                return char;
            })
            .reduce((accu, curr) => accu + (curr || ''));
    }

    searchNote(initialNote: string, moveHouse: number) {
        const { index: i } = this.getIndex(initialNote);
        const index = i + moveHouse;

        if (index >= this.scale.length) {
            return this.scale[index - this.scale.length];
        }
        return this.scale[index];
    }

    matchChord(notesChord: Scale[]): MatchChord[] {
        const catchphrase = notesChord[notesChord.length - 1] as Scale;
        const uniqNotes = [...new Set(notesChord)];
        return this.scale
            .map((note) =>
                this.checkChord(note, catchphrase, notesChord, uniqNotes)
            )
            .sort((a, b) => a.probability - b.probability)
            .reverse();
    }

    private checkChord(
        note: string,
        catchphrase: Scale,
        notesChord: Scale[],
        uniqNotes: Scale[]
    ): MatchChord {
        const scale = this.majorMusicalScale.map((i) =>
            this.searchNote(note, i)
        );

        const chordInversion = this.checkChordInversion(scale, catchphrase);
        const seventh = this.checkSeventh(scale, uniqNotes);
        const seventhMajor = this.checkSeventhMajor(scale, uniqNotes);
        const ninth = this.checkNinth(scale, uniqNotes);
        const diminished = this.checkDiminished(scale, uniqNotes);
        const eleventh = this.checkEleventh(scale, uniqNotes);
        const thirteenth = this.checkThirteenth(scale, uniqNotes);
        const omittedFifth = this.checkOmittedFifth(scale, uniqNotes);

        const major = this.checkMajor(
            scale,
            uniqNotes,
            seventh || seventhMajor || ninth || diminished
        );
        const minor = this.checkMinor(
            scale,
            uniqNotes,
            seventh || seventhMajor || ninth || diminished
        );

        const sus =
            this.checkSuspended(scale, uniqNotes) &&
            (seventh || seventhMajor || ninth || diminished) &&
            !major &&
            !minor;

        const looseEnds = this.checkLooseEnds(scale, notesChord);

        const matchChord = {
            name: note,
            catchphrase,
            chordInversion,
            scale,
            major,
            minor,
            sus,
            seventh,
            seventhMajor,
            ninth,
            diminished,
            eleventh,
            thirteenth,
            looseEnds,
            omittedFifth,
            composition: notesChord,
        } as MatchChord;

        matchChord.chordName = this.getNameChord(matchChord);
        matchChord.probability = this.calculateProbability(matchChord);

        return matchChord;
    }

    checkMajor(scale: Scale[], notesChord: Scale[], overwriteFifth: boolean) {
        return (
            // notesChord.includes(scale[0]) &&
            notesChord.includes(scale[2]) &&
            (notesChord.includes(scale[4]) || overwriteFifth)
        );
    }

    checkMinor(scale: Scale[], notesChord: Scale[], overwriteFifth: boolean) {
        const third = this.backNote(scale[2]) as Scale;
        return (
            notesChord.includes(scale[0]) &&
            notesChord.includes(third) &&
            (notesChord.includes(scale[4]) || overwriteFifth)
        );
    }

    checkSuspended(scale: Scale[], notesChord: Scale[]) {
        const third = this.backNote(scale[2]) as Scale;

        return (
            notesChord.includes(scale[0]) &&
            (notesChord.includes(scale[1]) || notesChord.includes(scale[3])) && //PRECISA TER A 4/11 OU A 2/9
            !notesChord.includes(scale[2]) &&
            !notesChord.includes(third)
        );
    }

    checkOmittedFifth(scale: Scale[], notesChord: Scale[]) {
        return !notesChord.includes(scale[4]);
    }

    checkNinth(scale: Scale[], notesChord: Scale[]) {
        return notesChord.includes(scale[1]);
    }

    checkSeventh(scale: Scale[], notesChord: Scale[]) {
        const seventh = this.backNote(scale[6]) as Scale;
        return notesChord.includes(seventh);
    }

    checkSeventhMajor(scale: Scale[], notesChord: Scale[]) {
        return notesChord.includes(scale[6]);
    }

    checkDiminished(scale: Scale[], notesChord: Scale[]) {
        const fourth = this.backNote(scale[3]) as Scale;
        const fifth = this.backNote(scale[4]) as Scale;
        return notesChord.includes(fifth);
    }

    checkEleventh(scale: Scale[], notesChord: Scale[]) {
        return notesChord.includes(scale[4]);
    }

    checkThirteenth(scale: Scale[], notesChord: Scale[]) {
        return notesChord.includes(scale[5]);
    }

    checkChordInversion(scale: Scale[], note: Scale) {
        return scale[0] !== note;
    }

    checkLooseEnds(scale: Scale[], notesChord: Scale[]) {
        const diminished = this.backNote(scale[4]) as Scale;
        const seventh = this.backNote(scale[6]) as Scale;

        const completScale = [...scale, diminished, seventh];
        return notesChord.filter((note) => !completScale.includes(note));
    }

    getNameChord(matchChord: MatchChord): string {
        let chord = matchChord.name;

        if (matchChord.minor) chord += 'm';
        if (matchChord.sus) chord += 'SUS';
        if (matchChord.seventh) chord += '7';
        if (matchChord.seventhMajor) chord += '7+';
        if (matchChord.ninth) chord += '(9)';
        if (matchChord.diminished) chord += '°';
        if (matchChord.chordInversion) chord += `/${matchChord.catchphrase}`;

        return chord;
    }

    scoreIfMajor(matchChord: MatchChord) {
        return matchChord.major ? 3 : 0;
    }

    scoreIfMinor(matchChord: MatchChord) {
        return matchChord.minor ? 3 : 0;
    }

    scoreIfSuspended(matchChord: MatchChord) {
        return matchChord.sus ? 3 : 0;
    }

    scoreIfNotMajorNotMinorNotSuspended(matchChord: MatchChord) {
        return !matchChord.minor && !matchChord.major && !matchChord.sus
            ? -10
            : 0;
    }

    scoreIfDoubleFirstDegree(matchChord: MatchChord) {
        return !matchChord.chordInversion &&
            matchChord.composition.filter(
                (note) => note === matchChord.catchphrase
            ).length > 1
            ? 2
            : 0;
    }

    scoreIfDoubleSecondDegree(matchChord: MatchChord) {
        return matchChord.composition.filter(
            (note) => note === matchChord.scale[1]
        ).length > 1
            ? -1
            : 0;
    }

    scoreIfDoubleThirdDegree(matchChord: MatchChord) {
        return matchChord.composition.filter(
            (note) => note === matchChord.scale[2]
        ).length > 1
            ? 1
            : 0;
    }

    scoreIfDoubleFifthDegree(matchChord: MatchChord) {
        return matchChord.composition.filter(
            (note) => note === matchChord.scale[4]
        ).length > 1
            ? 1
            : 0;
    }

    scoreIfDoubleSixthDegree(matchChord: MatchChord) {
        return matchChord.composition.filter(
            (note) => note === matchChord.scale[5]
        ).length > 1
            ? -1
            : 0;
    }

    scoreIfDoubleChordInversion(matchChord: MatchChord) {
        let score = 0;
        if (matchChord.chordInversion) {
            score -= 1;
            if (!matchChord.scale.includes(matchChord.catchphrase as Scale)) {
                score -= 1;
            }
        }

        return score;
    }

    scoreIfSeventh(matchChord: MatchChord) {
        return matchChord.seventh ? 1 : 0;
    }

    scoreIfNinth(matchChord: MatchChord) {
        return matchChord.ninth ? 1 : 0;
    }

    scoreIfEleventh(matchChord: MatchChord) {
        return matchChord.eleventh ? 1 : 0;
    }

    scoreIfThirteenth(matchChord: MatchChord) {
        return matchChord.thirteenth ? 1 : 0;
    }

    scoreIfDiminished(matchChord: MatchChord) {
        return matchChord.diminished ? 1 : 0;
    }

    scoreIfSeventhMajor(matchChord: MatchChord) {
        return matchChord.seventhMajor ? 1 : 0;
    }

    notOmittedTheFifthDegree(matchChord: MatchChord) {
        return !matchChord.omittedFifth ? 1 : 0;
    }

    omittedTheFifthDegreeCorrectly(matchChord: MatchChord) {
        return matchChord.omittedFifth &&
            (matchChord.seventh ||
                matchChord.ninth ||
                matchChord.eleventh ||
                matchChord.thirteenth)
            ? 1
            : 0;
    }

    omittedTheFifthDegreeNotCorrectly(matchChord: MatchChord) {
        return matchChord.omittedFifth &&
            !matchChord.seventh &&
            !matchChord.ninth &&
            !matchChord.eleventh &&
            !matchChord.thirteenth
            ? -3
            : 0;
    }

    scoreIfMajorAndMinor(matchChord: MatchChord) {
        return matchChord.major && matchChord.minor ? -5 : 0;
    }

    moreThanTwoVariations(matchChord: MatchChord) {
        let variations = 0;
        if (matchChord.seventh) variations++;
        if (matchChord.seventhMajor) variations++;
        if (matchChord.ninth) variations++;
        if (matchChord.eleventh) variations++;
        if (matchChord.thirteenth) variations++;
        if (matchChord.chordInversion) variations++;

        return variations > 2 ? -2 : 0;
    }

    calculateProbability(matchChord: MatchChord) {
        let probability = 0;

        //BONIFICAR
        probability += this.scoreIfMajor(matchChord);
        probability += this.scoreIfMinor(matchChord);
        probability += this.scoreIfSuspended(matchChord);
        probability += this.scoreIfDoubleFirstDegree(matchChord);
        probability += this.scoreIfDoubleThirdDegree(matchChord);
        probability += this.scoreIfDoubleFifthDegree(matchChord);

        probability += this.scoreIfSeventh(matchChord);
        probability += this.scoreIfNinth(matchChord);
        probability += this.scoreIfEleventh(matchChord);
        probability += this.scoreIfThirteenth(matchChord);
        probability += this.scoreIfDiminished(matchChord);
        probability += this.scoreIfSeventhMajor(matchChord);
        probability += this.notOmittedTheFifthDegree(matchChord);
        probability += this.omittedTheFifthDegreeCorrectly(matchChord);

        //PENALIZAR
        probability += this.scoreIfNotMajorNotMinorNotSuspended(matchChord);
        // probability += this.scoreIfDoubleChordInversion(matchChord);
        probability += this.scoreIfDoubleSixthDegree(matchChord);
        probability += this.scoreIfDoubleSecondDegree(matchChord);
        probability += this.omittedTheFifthDegreeNotCorrectly(matchChord);
        probability += this.scoreIfMajorAndMinor(matchChord);
        probability += this.moreThanTwoVariations(matchChord);

        if (matchChord.looseEnds.length) {
            probability = probability - 1;
        }

        return probability;
    }
}

// 0, 2, 4, 5, 7, 9, 11

// 1°  ---
// 2° maior     -1 fica menor           +1 fica aumentada
// 3° maior     -1 fica menor           +1 fica aumentada
// 4° justa     -1 fica diminuta        +1 fica aumentada
// 5° justa     -1 fica diminuta        +1 fica aumentada
// 6° maior     -1 fica menor           +1 fica aumentada
// 7° maior     -1 fica menor           +1 fica aumentada

// 1° C   ---       C
// 2° D  maior      Db
// 3° E  maior      Eb      -1 fica menor
// 4° F  justa      E
// 5° G  justa      F#
// 6° A  maior      Ab      -1 fica menor
// 7° B  maior      Bb      -1 fica menor

// 1° E   ---       E
// 2° F#  maior     F
// 3° G   maior     F#      -1 fica menor
// 4° A   justa     Ab
// 5° B   justa     Bb
// 6° C#  maior     C      -1 fica menor
// 7° D#  maior     D      -1 fica menor
