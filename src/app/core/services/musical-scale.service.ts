import { Injectable } from "@angular/core";
import { Observable, of } from 'rxjs';
import { FormatMusicService } from './format-musica.service';


export type Scale = 'C' | 'C#' | 'D' | 'Eb' | 'E' | 'F' | 'F#' | 'G' | 'Ab' | 'A' | 'Bb' | 'B';
export type Note = 'C' | 'D' | 'E' | 'F' | 'G' | 'A' | 'B';
export type NoteIncrement = 'M' | 'm' | '7' | '9' | '/';

@Injectable()
export class MusicalScaleService {

    scale: Scale[] = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];
    majorMusicalScale = [0, 2, 4, 5, 7, 9, 11];
    minorMusicalScale = [0, 2, 3, 5, 7, 8, 10];

    A = ['E', 'F#', 'Ab', 'A', 'B', 'C#', 'Eb']

    constructor(private split: FormatMusicService) { }

    getScale(): Observable<Scale[]> {
        return of(this.scale);
    }

    async backTone(currentNote: Note): Promise<string> {
        return this.backNote(currentNote);
    }

    async nextTone(currentNote: Scale): Promise<string> {
        return this.nextNote(currentNote);
    }

    private nextNote(currentNote: Scale): string {
        const { index, increment } = this.getIndex(currentNote);
        if (index === this.scale.length - 1) {
            return this.scale[0] + increment;
        }
        return this.scale[index + 1] + increment;
    }

    private backNote(currentNote: string): string {
        const { index, increment } = this.getIndex(currentNote);
        if (index === 0) {
            return this.scale[this.scale.length - 1]  + increment;
        }
        return this.scale[index - 1] + increment;
    }

    private getIndex(currentNote: string): { index: number, increment: string } {
        const note = currentNote.replace(/M|m|7|9|\(|\)/g, '');
        const increment = currentNote.replace(/[^(M|m|7|9|\(|\))]/g, '');
        const index = this.scale.indexOf(note as Note);

        return { index, increment }
    }

    private teste(currentNote: string, changeValue: number): string {
        const { index, increment } = this.getIndex(currentNote);
        if (index+changeValue >= this.scale.length) {
            return this.scale[index+changeValue - this.scale.length] + increment;
        }
        return this.scale[index + changeValue] + increment;
    }

    changeTone(notes: string, origemTone: string, currentTone: string): string {
        const origemToneIndex  = this.scale.indexOf(origemTone as any)
        const currentToneIndex  = this.scale.indexOf(currentTone as any)
        const changeValue = -(origemToneIndex - currentToneIndex)

        return this.split.splitLine(notes)
            .map((char: string) => {
                if (char && char.trim()) {
                    return char.split('/').reduce((accu, curr) => {
                        if (accu) {
                            accu += "/"
                        }
                        accu += this.teste(curr as Note, changeValue)
                        return accu;
                    }, '');
                }

                return char;
            })
        .reduce((accu, curr) => accu + (curr || ''));
    ;
    }

    changeNotes(notes: string, change: 'back' | 'next'): string {
        return this.split.splitLine(notes)
            .map((char: string) => {
                if (char && char.trim()) {
                    return char.split('/').reduce((accu, curr) => {
                        if (accu) {
                            accu += "/"
                        }

                        accu += (change === 'back' ? this.backNote(curr as Note) : this.nextNote(curr as Note))
                        return accu;
                    }, '');
                }

                return char;
            })
            .reduce((accu, curr) => accu + (curr || ''));
        ;
    }

}
