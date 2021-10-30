import { Chord } from './../../../../components/dialog-chord/domain/models/Chord';
import { DialogChordComponent } from './../../../../components/dialog-chord/presenter/dialog-chord/dialog-chord.component';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, pipe } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CiphersFactoryPresenter } from '../../domain/boundaries/ciphers-factory.presenter';

export interface DialogData {
    animal: string;
    name: string;
    callback: (value?: any) => void
}

export type Scale = 'C' | 'C#' | 'D' | 'Eb' | 'E' | 'F' | 'F#' | 'G' | 'Ab' | 'A' | 'Bb' | 'B';
export type Note = 'C' | 'D' | 'E' | 'F' | 'G' | 'A' | 'B';

@Component({
    selector: 'cf-dialog-set-note',
    templateUrl: './dialog-set-note.component.html',
    styleUrls: ['./dialog-set-note.component.scss']
})
export class DialogSetNoteComponent {
    formGroup: FormGroup;
    filteredOptionsNote!: Observable<Chord[]>;

    constructor(
        public dialogRef: MatDialogRef<DialogSetNoteComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        public dialog: MatDialog,
        private presenter: CiphersFactoryPresenter,
        private formBuilder: FormBuilder) {

        this.formGroup = this.formBuilder.group({
            note: [''],
        })
    }

    ngOnInit() {
        this.loadChords();
    }


    close(): void {
        this.dialogRef.close();
    }

    ok(): void {
        this.data.callback(this.formGroup.get('note')?.value || ' ');
        this.close();
    }

    toControl(formControlName: string): FormControl {
        return this.formGroup.get(formControlName) as FormControl
    }

    private filter(formControlName: string, options: () => Chord[]): Observable<Chord[]> {
        return this.toControl(formControlName).valueChanges
            .pipe(
                startWith(''),
                map(value => this._filter(value, options()))
            );
    }

    private _filter(value: string, options: Chord[]): Chord[] {
        const filterValue = value.toUpperCase();
        return options.filter(option => option.chord.toUpperCase().includes(filterValue));
    }



    private loadChords(): void {
        this.presenter.loadChords().subscribe(reponse => {
            this.filteredOptionsNote = this.filter('note', () => reponse)
        });
    }


    generate<T>(scale: string[], formula: number[]): T[] {
        return scale.reduce((accu: any[], curr: string, currentIndex: number) => {
            let index = currentIndex;
            const _scale = this.simpleGenerate(scale, formula, index);
            accu.push(_scale)
            return accu;
        }, [])
    }

    simpleGenerate(scale: string[], formula: number[], index: number): string[] {
        return formula.map(f => {
            index = index + f;
            return scale.length - 1 >= index ? scale[index] : scale[index - scale.length]
        });
    }


    openDialogAddChord(): void {
        this.dialog.open(DialogChordComponent, {
            minHeight: 485,
            minWidth: 775,
            data: {
                callback: () => {
                    this.loadChords()
                }
            }
        })
    }
}
