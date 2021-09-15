import { Injectable } from "@angular/core";
import { Observable, of } from 'rxjs';


export type Scale = 'C' | 'C#' | 'D' | 'Eb' | 'E' | 'F' | 'F#' | 'G' | 'Ab' | 'A' | 'Bb' | 'B';
export type Note = 'C' | 'D' | 'E' | 'F' | 'G' | 'A' | 'B';
export type NoteIncrement = '#' | 'b' | 'M' | 'm' | '7' | '9';

@Injectable()
export class MusicalScaleService {
    scale: Scale[] = ['C' , 'C#' , 'D' , 'Eb' , 'E' , 'F' , 'F#' , 'G' , 'Ab' , 'A' , 'Bb' , 'B'];
    majorMusicalScale = [0, 2, 4, 5, 7, 9, 11];
    minorMusicalScale = [0, 2, 3, 5, 7, 8, 10];

    A = ['E', 'F#', 'Ab', 'A', 'B', 'C#', 'Eb']

    constructor() { }

    getScale(): Observable<Scale[]> {
        return of(this.scale);
    }

    async backTone(currentNote: Note): Promise<Scale> {
        const index = this.scale.indexOf(currentNote);
        if (index === 0) {
            return this.scale[this.scale.length-1];
        }
        return this.scale[index-1];
    }

    async nextTone(currentNote: Scale): Promise<Scale> {
        const index = this.scale.indexOf(currentNote);
        if (index === this.scale.length-1) {
            return this.scale[0];
        }
        return this.scale[index+1];
    }

}
