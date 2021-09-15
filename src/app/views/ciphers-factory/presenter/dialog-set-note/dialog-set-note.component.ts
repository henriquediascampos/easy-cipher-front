import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, pipe } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

export interface DialogData {
    animal: string;
    name: string;
    callback: (value?: any) => void
}

export type Scale = 'C' | 'C#' | 'D' | 'Eb' | 'E' | 'F' | 'F#' | 'G' | 'Ab' | 'A' | 'Bb' | 'B';
export type Note = 'C' | 'D' | 'E' | 'F' | 'G' | 'A' | 'B';
export type NoteIncrement = '#' | 'b' | 'M' | 'm' | '7' | '9';

@Component({
    selector: 'cf-dialog-set-note',
    templateUrl: './dialog-set-note.component.html',
    styleUrls: ['./dialog-set-note.component.scss']
})
export class DialogSetNoteComponent {
    formGroup: FormGroup;

    filteredOptionsNote!: Observable<string[]>;

    constructor(
        public dialogRef: MatDialogRef<DialogSetNoteComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private formBuilder: FormBuilder) {

        this.formGroup = this.formBuilder.group({
            note: [''],
        })
    }

    ngOnInit() {
        this.filteredOptionsNote = this.filter('note', () => this.optionsNote())
    }


    close(): void {
        this.dialogRef.close();
    }

    ok(): void {
        this.data.callback(this.formGroup.get('note')?.value);
        this.close();
    }

    toControl(formControlName: string): FormControl {
        return this.formGroup.get(formControlName) as FormControl
    }

    private filter(formControlName: string, options: () => string[]): Observable<string[]> {
        return this.toControl(formControlName).valueChanges
            .pipe(
                startWith(''),
                map(value => this._filter(value, options()))
            );
    }

    private _filter(value: string, options: string[]): string[] {
        const filterValue = value.toLowerCase();
        return options.filter(option => option.toLowerCase().includes(filterValue));
    }



    optionsNote(): string[] {
        const completeScale: Scale[] = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];
        const scales = this.generate<string[]>(completeScale, [0, 2, 2, 1, 2, 2, 2])
        const majorChords = scales.reduce((accu: string[], curr: string[]) => [...accu, this.simpleGenerate(curr, [0, 3, 1], 0)] as string[], []);

        return completeScale;
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


}
