import { FormatMusicService } from './../../../../core/services/format-musica.service';
import { Cipher } from './../../../songbook/domain/models/Cipher';
import { Component, HostBinding, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { Router } from '@angular/router';
import { CipherTranslateService } from 'src/app/translate/cipher-translate.service';
import { CiphersFactoryPresenter } from '../../domain/boundaries/ciphers-factory.presenter';
import { CiphersFactoryFirstTabComponent } from '../ciphers-factory-first-tab/ciphers-factory-first-tab.component';
import { CiphersFactorySecondaryTabComponent, Line } from '../ciphers-factory-secondary-tab/ciphers-factory-secondary-tab.component';
import { SystemDialogService } from './../../../../core/services/system-dilog.service';

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

    id?: string;
    state?: Cipher;

    visualizarionMode = false;

    constructor(
        private formBuilder: FormBuilder,
        private translate: CipherTranslateService,
        private dialog: SystemDialogService,
        private presenter: CiphersFactoryPresenter,
        private router: Router,
        private formatMusic: FormatMusicService
    ) {

        this.formGroup = this.formBuilder.group({
            title: ['', [Validators.required, Validators.minLength(3)]],
            lyric: ['', [Validators.required, Validators.minLength(100)]],
            cipher: [''],
            tone: [''],
        });

        this.translate.change('CIPHER_FACTORY.LYRICS', (t: string) => { this.firstTab = t });
        this.translate.change('CIPHER_FACTORY.CIPHER', (t: string) => { this.secondaryTab = t });

        if (this.router.getCurrentNavigation()?.extras.state) {
            const { param }: any = this.router.getCurrentNavigation()?.extras.state
            this.state = param;
        }

    }

    ngOnInit(): void {
        this.toControl('lyric').valueChanges.subscribe(value => {
            this.secondary?.transformText(value);
        });
        this.reflectTitle()

        // this.dependesOn('lyric', ['title']);
        // this.dependesOn('cipher', ['title', 'lyric', 'tone'], disable => {
        //     this.secondary?.disable(disable);
        // });

        setTimeout(() => {
            this.visualization();
        }, 100);

    }

    private reflectTitle() {
        let a = this.toControl('title').valueChanges.subscribe(value => {
            a.unsubscribe();
            setTimeout(() => {
                this.toControl('title').setValue(value);
                this.reflectTitle();
            }, 0);
        });
    }

    private dependesOn(dependsOn: string, depends: string[], fn?: (disable: boolean) => void): void {
        const control = this.toControl(dependsOn);
        depends.forEach(depend => {
            this.toControl(depend).valueChanges.subscribe(value => {
                const disabled = depends.some(v => this.toControl(v).valid === false)
                if (fn) {
                    fn(disabled);
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

    toControl(formControlName: string): FormControl {
        return this.formGroup.get(formControlName) as FormControl
    }

    save(): void {
        if (this.formGroup.valid) {
            const music = this.formGroup.getRawValue();
            music.cipher = JSON.stringify(music.cipher);

            music.lyric = this.formatMusic.brackText(music.lyric)
                .filter(value => value.type !== 'cipher')
                .reduce((accu: string, curr: Line) => {
                    accu = accu ? accu + '\n' + curr.content : '' + curr.content;
                    return accu;
                }, '');

            if (this.id) {
                music.id = this.id;
            }

            this.presenter.save(music)
                .subscribe(reponse => {
                    this.state = reponse;
                    this.visualization();
                    this.dialog.sucess({
                        message: this.translate.getWithArgs('MESSAGE.SAVE_SUCCESS', { arg: this.translate.get('CIPHER_FACTORY.CIPHER') })
                    });
                });
        } else {
            this.dialog.warn({ message: 'Antes de salvar preencha todos os campos obrigatórios!' });
        }
    }

    visualization() {
        if (this.state) {
            this.visualizarionMode = true;
            this.id = this.state!.id;
            this.toControl('lyric').setValue(this.state!.lyric);
            this.toControl('title').setValue(this.state.title);
            this.toControl('tone').setValue(this.state.tone);
            setTimeout(() => {
                this.secondary?.emitterChangeText(JSON.parse(this.state!.cipher));
            }, 200);
        }
    }

    new(): void {
        this.visualizarionMode = !this.visualizarionMode;

        this.formGroup.reset();
        this.id = '';
        this.state = undefined
    }

    exclude(): void {
        this.dialog.warn({
            subtitle: 'Excluir?',
            message: 'Tem certeza que deseja seguir com essa operação!',
            callback: () => {
                this.presenter.delete(this.id!).subscribe(response => {
                    this.router.navigate(['ciphers']);
                });
            }
        });
    }
}

