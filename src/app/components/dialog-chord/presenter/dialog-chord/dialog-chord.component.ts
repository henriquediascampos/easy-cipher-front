import { ChordNotes, GuitarArmComponent } from './../../../guitar-arm/presenter/guitar-arm/guitar-arm.component';
import { SpinnerService } from './../../../../core/services/spinner.service';
import { SystemDialogService } from './../../../../core/services/system-dilog.service';
import { CipherTranslateService } from './../../../../translate/cipher-translate.service';
import { MatchChord, Scale, Note, MusicalScaleService } from './../../../../core/services/musical-scale.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { DialogData } from './../../../system-dialog/presenter/system-dialog/system-dialog.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit, AfterViewInit, ViewChild } from '@angular/core';

@Component({
  selector: 'ec-dialog-chord',
  templateUrl: './dialog-chord.component.html',
  styleUrls: ['./dialog-chord.component.sass']
})
export class DialogChordComponent implements AfterViewInit {

    scales?: MatchChord[];
    @ViewChild('guitarArm') guitarArm?: GuitarArmComponent;
    graus = Array.from(new Array(7)).map((a, i) => i + 1);

    placeholder = 'please, inset name chord.';
    formGroup: FormGroup;

    constructor(
        private scale: MusicalScaleService,
        private translate: CipherTranslateService,
        // private presenter: CipherDictionaryPresenter,
        private dialog: SystemDialogService,
        private spinner: SpinnerService,

        public dialogRef: MatDialogRef<DialogChordComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private formBuilder: FormBuilder) {
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
            // this.presenter.save(this.formGroup.getRawValue()).subscribe(
            //     (reponse) => {
            //         this.dialog.sucess({
            //             message: this.translate.getWithArgs(
            //                 'MESSAGE.SAVE_SUCCESS',
            //                 {
            //                     arg: this.translate.get('CIPHER_DICTIONARY.CHORD'),
            //                 }
            //             ),
            //         });
            //     },
            //     () => {},
            //     () => {
            //         this.spinner.off();
            //     }
            // );
        }

        variationsNotation(index: number, note: string): string {
            return  index?  index === 4 || index === 5 ? 'dim' : '-' : ''
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
