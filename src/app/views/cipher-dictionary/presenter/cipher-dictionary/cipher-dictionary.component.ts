import { Scale } from 'src/app/core/services/musical-scale.service';
import { Note } from './../../../ciphers-factory/presenter/dialog-set-note/dialog-set-note.component';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CipherDictionaryPresenter } from '../../domain/boundaries/cipher-dictionary.presenter';
import {
    ChordNotes,
    GuitarArmComponent,
} from './../../../../components/guitar-arm/presenter/guitar-arm/guitar-arm.component';
import {
    MatchChord,
    MusicalScaleService,
} from './../../../../core/services/musical-scale.service';
import { SpinnerService } from './../../../../core/services/spinner.service';
import { SystemDialogService } from './../../../../core/services/system-dilog.service';
import { CipherTranslateService } from './../../../../translate/cipher-translate.service';

@Component({
    selector: 'ec-cipher-dictionary',
    templateUrl: './cipher-dictionary.component.html',
    styleUrls: ['./cipher-dictionary.component.sass'],
})
export class CipherDictionaryComponent implements AfterViewInit {
    scales?: MatchChord[];
    @ViewChild('guitarArm') guitarArm?: GuitarArmComponent;
    graus = Array.from(new Array(7)).map((a, i) => i + 1);

    placeholder = 'please, inset name chord.';
    formGroup: FormGroup;
    constructor(
        private scale: MusicalScaleService,
        private translate: CipherTranslateService,
        private presenter: CipherDictionaryPresenter,
        private dialog: SystemDialogService,
        private formBuilder: FormBuilder,
        private spinner: SpinnerService
    ) {
        this.formGroup = this.formBuilder.group({
            chord: ['', Validators.required],
            chordMapped: ['', Validators.required],
        });
    }

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

            this.formGroup.get('chordMapped')?.setValue(JSON.stringify(notes));
            this.formGroup.get('chord')?.reset();
        });
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

    setChord(value: string): void {
        this.formGroup.get('chord')?.setValue(value);
    }

    saveValidate(): void {
        if (this.formGroup.valid) {
            if (
                !this.scales?.some(
                    (scale) =>
                        scale.chordName === this.formGroup.get('chord')?.value
                )
            ) {
                this.dialog.warn({
                    message:
                        'O nome escolhido para o acode não pare de acordo, deseja gravar assim mesmo?',
                    callback: () => {
                        this.save();
                    },
                });
            } else {
                this.save();
            }
        } else {
            this.dialog.warn({
                message:
                    'Antes de salvar preencha todos os campos obrigatórios!',
            });
        }
    }

    private save(): void {
        this.spinner.on();
        this.presenter.save(this.formGroup.getRawValue()).subscribe(
            (reponse) => {
                this.dialog.sucess({
                    message: this.translate.getWithArgs(
                        'MESSAGE.SAVE_SUCCESS',
                        {
                            arg: this.translate.get('CIPHER_DICTIONARY.CHORD'),
                        }
                    ),
                });
            },
            () => {},
            () => {
                this.spinner.off();
            }
        );
    }

    variationsNotation(index: number, note: string): string {
        return  index?  index === 3 || index === 4 ? 'dim' : '-' : ''
    }

    variationsNote(index: number, note: string): string {
        return index ? this.scale.changeNotes(note as Note, 'back') as Scale : ''
    }

    match(scale: MatchChord, note: string): boolean {
        return scale.composition.includes(note as Scale);
    }
    // 2° maior     -1 fica menor           +1 fica aumentada
    // 3° maior     -1 fica menor           +1 fica aumentada
    // 4° justa     -1 fica diminuta        +1 fica aumentada
    // 5° justa     -1 fica diminuta        +1 fica aumentada
    // 6° maior     -1 fica menor           +1 fica aumentada
    // 7° maior     -1 fica menor           +1 fica aumentada
}
