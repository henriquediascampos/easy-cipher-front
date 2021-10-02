import { startWith, map } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cipher } from './../../domain/models/Cipher';
import { Observable } from 'rxjs';
import { Component, HostBinding, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SongbookPresenter } from '../../domain/boundaries/songbook.presenter';
import { MatAutocomplete } from '@angular/material/autocomplete';

export interface DialogData {
    mensage: string;
    callback?: (value?: any) => void
}

@Component({
    selector: 'ec-dialog-add-cipher',
    templateUrl: './dialog-add-cipher.component.html',
    styleUrls: ['./dialog-add-cipher.component.sass']
})
export class DialogAddCipherComponent implements OnInit {

    formGroup: FormGroup;
    filteredOptions?: Observable<Cipher[]>
    @ViewChild('teste') teste!: MatAutocomplete;

    constructor(
        public dialogRef: MatDialogRef<DialogAddCipherComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private presenter: SongbookPresenter,
        private formBuilder: FormBuilder
    ) {
        this.formGroup = this.formBuilder.group({
            cipher: ['', Validators.required]
        })
    }

    ngOnInit(): void {
        this.presenter.findAllCiphers({}).subscribe(response => {
            this.filteredOptions = this.formGroup.get('cipher')?.valueChanges.pipe(
                startWith(''),
                map(value => response.filter(option => {
                    return !!option.title.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                        .includes(
                            value.toUpperCase ?
                            value.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                            : (value as Cipher).title.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                    )
                })))

        });
    }

    close(): void {
        this.dialogRef.close();
    }

    add(): void {
        if (this.data?.callback) {
            this.data.callback();
        }
        console.log(this.formGroup.get('cipher')?.value);

        // this.close();
    }

    public displayProperty(value: { title: any; }) {
        if (value) {
          return value.title;
        }
      }
}
