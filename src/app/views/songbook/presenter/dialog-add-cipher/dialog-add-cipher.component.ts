import { SpinnerService } from './../../../../core/services/spinner.service';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Scale } from 'src/app/core/services/musical-scale.service';
import { SongbookPresenter } from '../../domain/boundaries/songbook.presenter';
import { MusicalScaleService } from './../../../../core/services/musical-scale.service';
import { Cipher } from './../../domain/models/Cipher';
import { CustomCipher } from './../../domain/models/CustomCipher';
import { Songbook } from './../../domain/models/Songbook';

export interface DialogData {
    songbook: string;
    callback?: (value?: any) => void;
}

@Component({
    selector: 'ec-dialog-add-cipher',
    templateUrl: './dialog-add-cipher.component.html',
    styleUrls: ['./dialog-add-cipher.component.sass'],
})
export class DialogAddCipherComponent implements OnInit {
    filteredTones?: Observable<Scale[]>;

    formGroup: FormGroup;
    filteredOptions?: Observable<Cipher[]>;
    @ViewChild('teste') teste!: MatAutocomplete;

    constructor(
        public dialogRef: MatDialogRef<DialogAddCipherComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private presenter: SongbookPresenter,
        private formBuilder: FormBuilder,
        private scale: MusicalScaleService,
        private spinner: SpinnerService
    ) {
        this.formGroup = this.formBuilder.group({
            cipher: ['', Validators.required],
            customTone: [''],
        });
    }

    ngOnInit(): void {
        this.scale.getScale().subscribe((scaleOptions) => {
            this.filteredTones = this.formGroup
                .get('customTone')
                ?.valueChanges.pipe(
                    startWith(''),
                    map((value: string) =>
                        scaleOptions.filter(
                            (option) =>
                                !!option
                                    .toUpperCase()
                                    .includes(value.toUpperCase())
                        )
                    )
                );
        });

        this.spinner.on();
        this.presenter.findAllCiphers({}).subscribe(
            (response) => {
                this.filteredOptions = this.formGroup
                    .get('cipher')
                    ?.valueChanges.pipe(
                        startWith(''),
                        map((value) =>
                            response.filter((option) => {
                                return !!option.title
                                    .toUpperCase()
                                    .normalize('NFD')
                                    .replace(/[\u0300-\u036f]/g, '')
                                    .includes(
                                        value.toUpperCase
                                            ? value
                                                  .toUpperCase()
                                                  .normalize('NFD')
                                                  .replace(
                                                      /[\u0300-\u036f]/g,
                                                      ''
                                                  )
                                            : (value as Cipher).title
                                                  .toUpperCase()
                                                  .normalize('NFD')
                                                  .replace(
                                                      /[\u0300-\u036f]/g,
                                                      ''
                                                  )
                                    );
                            })
                        )
                    );
            },
            () => {},
            () => {
                this.spinner.off();
            }
        );
    }

    close(): void {
        this.dialogRef.close();
    }

    add(): void {
        const customCipher: CustomCipher = this.formGroup.getRawValue();
        customCipher.songbook = { id: this.data.songbook } as Songbook;
        this.spinner.on();

        this.presenter.add(customCipher).subscribe(
            (response) => {
                if (this.data?.callback) {
                    this.data.callback();
                }
                this.close();
            },
            () => {},
            () => {
                this.spinner.off();
            }
        );
    }

    public displayProperty(value: { title: any }) {
        if (value) {
            return value.title;
        }
    }
}
