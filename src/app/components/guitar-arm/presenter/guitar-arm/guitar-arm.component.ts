import { Component, OnInit, HostBinding, OnChanges, SimpleChanges, DoCheck, ViewChild, ElementRef } from '@angular/core';
import { Subject } from 'rxjs';
import { MusicalScaleService } from './../../../../core/services/musical-scale.service';

declare type StateString = 'none' | 'touch' | 'catchphrase';

export declare type ChordNotes = {
    string: number;
    house: number;
    mute?: boolean;
};

@Component({
    selector: 'ec-guitar-arm',
    templateUrl: './guitar-arm.component.html',
    styleUrls: ['./guitar-arm.component.sass'],
})
export class GuitarArmComponent implements OnInit {
    @HostBinding('class') c = 'container full'

    houses = Array.from(new Array(24)).map((a, i) => i);
    strings = Array.from(new Array(6)).map((a, i) => i);
    stringsName = ['E', 'B', 'G', 'D', 'A', 'E'];

    stateString: StateString[] = Array.from(new Array(6)).map((a, i) => 'none');
    clazzSelect = 'select';

    private __chord = new Subject<ChordNotes[]>();
    chordChange = this.__chord.asObservable();

    private _chord: ChordNotes[] = [];

    get chord() {
        return this._chord;
    }

    set chord(newchord: ChordNotes[]) {
        this._chord = newchord;
        this.__chord.next(this.chord);
    }

    private addChordNote(newchordNote: ChordNotes): void {
        this.chord = [...this.chord, newchordNote];
    }

    constructor(private scale: MusicalScaleService) {
        this.strings.map((s) => ({
            string: s,
            houses: 0,
        }));

    }

    ngOnInit(): void {}

    select(string: number, house: number, ball: HTMLSpanElement): void {
        if (ball.classList.contains(this.clazzSelect)) {
            ball.classList.remove(this.clazzSelect);
            this.chord = this.chord.filter(
                (chord) =>
                    (chord.house !== house && chord.string === string) ||
                    chord.string !== string
            );
        } else {
            ball.classList.add(this.clazzSelect);
            this.addChordNote({
                house,
                string,
            });
        }

        this.checkStateString(string);
    }

    touchSelect(status: StateString, string: number): void {
        if (status === 'none') {
            this.addChordNote({
                house: -1,
                string,
            });
        } else {
            this.chord = this.chord.filter((chord) => chord.string !== string);
        }

        Array.from(document.getElementsByClassName(this.clazzSelect)).forEach(
            function (item) {
                if (item.id.split('-')[1] === string.toString()) {
                    item.classList.remove('select');
                }
            }
        );

        this.checkStateString(string);
    }

    private checkStateString(string: number): void {
        if (!this.chord.filter((chord) => chord.string === string).length) {
            this.stateString[string] = 'none';
        } else {
            this.stateString[string] = 'touch';
        }

        let graetString = -1;

        for (const chord of this.chord) {
            if (chord.string > graetString) {
                graetString = chord.string;
            }
        }

        this.stateString = this.stateString.map((state, index) => {
            if (graetString === index) {
                return 'catchphrase';
            }
            return state === 'none' ? 'none' : 'touch';
        });
    }

    widthString(indexString: number) {
        return 0.3 * indexString + 1 ;
    }

    getNote(string: number, house: number) {
        return this.scale.searchNote(this.stringsName[string], house);
    }

    teste(resize: HTMLElement) {
        resize.style.setProperty('--height', resize.offsetHeight +'px')
        resize.style.setProperty('--width', resize.offsetWidth +'px')
    }
}
