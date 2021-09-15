import { Component, HostBinding, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ProgressBarMode } from '@angular/material/progress-bar';
import CipherTranslateService from 'src/app/core/services/cipher-translate.service';
import { SystemDialogComponent } from './../../../../components/system-dialog/presenter/system-dialog/system-dialog.component';
import { CiphersFactoryFirstTabComponent } from '../ciphers-factory-first-tab/ciphers-factory-first-tab.component';
import { CiphersFactorySecondaryTabComponent } from '../ciphers-factory-secondary-tab/ciphers-factory-secondary-tab.component';
import { CiphersFactoryPresenter } from '../../domain/boudaries/ciphers-factory.presenter';

@Component({
    selector: 'ec-ciphers-factory',
    templateUrl: './ciphers-factory.component.html',
    styleUrls: ['./ciphers-factory.component.sass'],
})
export class CiphersFactoryComponent implements OnInit {
    @HostBinding('class') class = 'container full';
    formGroup: FormGroup;
    mode: ProgressBarMode = 'determinate';
    value2 = 0;
    bufferValue = 1;

    @ViewChild('secondary') secondary?: CiphersFactorySecondaryTabComponent;
    @ViewChild('primary') primary?: CiphersFactoryFirstTabComponent;
    firstTab!: string;
    secondaryTab!: string;

    constructor(
        private formBuilder: FormBuilder,
        private translate: CipherTranslateService,
        private dialog: MatDialog,
        private presenter: CiphersFactoryPresenter
    ) {

        this.formGroup = this.formBuilder.group({
            title: ['', [Validators.required, Validators.minLength(3)]],
            lyrics: ['', [Validators.required, Validators.minLength(100)]],
            cipher: [''],
            tone: [''],
        });

        this.translate.change("CIPHER_FACTORY.LYRICS", (t: string) => { this.firstTab = t });
        this.translate.change("CIPHER_FACTORY.CIPHER", (t: string) => { this.secondaryTab = t });
    }

    ngOnInit(): void {
        this.toControl('lyrics').valueChanges.subscribe(value => {
            this.secondary?.transformText(value);
        });
        this.reflectTitle()

        this.dependesOn('lyrics', ['title']);
        this.dependesOn('cipher', ['title', 'lyrics', 'tone'], disable => {
            this.secondary?.disable(disable);
        });

        this.toControl('lyrics').disable();
        setTimeout(() => {
            this.secondary?.disable(true)
        }, 100);
    }

    reflectTitle() {
        let a = this.toControl('title').valueChanges.subscribe(value => {
            a.unsubscribe();
            setTimeout(() => {
                this.toControl('title').setValue(value);
                this.reflectTitle();
            }, 0);
        });
    }

    toControl(formControlName: string): FormControl {
        return this.formGroup.get(formControlName) as FormControl
    }

    save(): void {
        if (this.formGroup.valid) {
            this.presenter.save(this.formGroup.getRawValue())
                .subscribe(reponse => {
                    console.log(reponse);
                });
        } else {
            this.dialog.open(SystemDialogComponent, {
                height: '250px',
                width: '520px',
                data: {
                    mensage: 'Antes de salvar preencha todos os campos obrigatórios!',
                    type: 'warn'
                }
            });
        }
    }

    disableTitle(): void {
        if (this.toControl('title')?.disabled) {
            this.toControl('title')?.enable()
        } else {
            this.toControl('title')?.disable()
        }
    }

    dependesOn(dependsOn: string, depends: string[], fn?: (disable: boolean) => void): void {
        const control = this.toControl(dependsOn);
        depends.forEach(depend => {
            this.toControl(depend).valueChanges.subscribe(value => {
                const disabled = depends.some(v => this.toControl(v).valid === false)
                if (fn) {
                    fn(disabled)
                } else {
                    if (disabled) {
                        if (control) {
                            control.disable();
                        }
                    } else {
                        if (control) {
                            control.enable();
                        }
                    }
                }
            });
        });
    }

}

