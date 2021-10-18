import { TranslateService } from '@ngx-translate/core';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {
    ChordNotes,
    GuitarArmComponent
} from './../../../../components/guitar-arm/presenter/guitar-arm/guitar-arm.component';
import {
    MatchChord,
    MusicalScaleService
} from './../../../../core/services/musical-scale.service';

@Component({
    selector: 'ec-cipher-dictionary',
    templateUrl: './cipher-dictionary.component.html',
    styleUrls: ['./cipher-dictionary.component.sass'],
})
export class CipherDictionaryComponent implements AfterViewInit {
    scales?: MatchChord[];
    @ViewChild('guitarArm') guitarArm?: GuitarArmComponent;
    graus = Array.from(new Array(7)).map((a, i) => i + 1);

    @ViewChild('chordName') chordName?: ElementRef;
    chord = new FormControl('', {
        validators: Validators.required,
    });

    mappedChord = new FormControl('', {
        validators: Validators.required,
    });

    placeholder = 'please, inset name chord.';

    constructor(private scale: MusicalScaleService, private tranlate: TranslateService) {}

    ngAfterViewInit(): void {
        this.guitarArm?.chordChange.subscribe((value) => {
            const notes = value
                .sort((a, b) => a.house - b.house)
                .sort((a, b) => a.string - b.string)
                .reduce((accu: ChordNotes[], curr) => {
                    const exists = accu.filter(
                        (a) => a.string === curr.string && a.house < curr.house
                    );
                    if (exists.length || !accu.length) {
                        accu = accu.filter((a) => a.string !== curr.string);
                    }

                    accu.push(curr);
                    return accu;
                }, []);
            this.mappedChord.setValue(JSON.stringify(notes));

            const notesChord = notes.map((a) => {
                const string = this.guitarArm?.stringsName[a.string];
                const note = this.scale.searchNote(string || '', a.house + 1);
                return note;
            });

            this.scales = this.scale
                .matchChord(notesChord)
                .filter(
                    (e) => (e.major || e.sus || e.minor) && e.probability > 0
                );

            this.placeholder =
                this.scales[0]?.chordName || 'please, inset name chord.';
        });
    }

    getNameChord(scale: MatchChord) {
        return this.scale.getNameChord(scale);
    }

    calculateProbability(probability: number) {
        let prob = 0;
        if (this.scales) {
            const first = this.scales[0].probability + 1;

            prob = Math.round((probability * 100) / first);
        }

        return prob + '%';
    }

    calculate(index: number) {
        return 1 - (index / 10) * 2;
    }
    save(): void {

    }
}
