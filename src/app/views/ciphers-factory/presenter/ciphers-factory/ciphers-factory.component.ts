import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
    Component,
    HostBinding,
    OnInit,
    ViewChild
} from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators
} from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { Router } from '@angular/router';
import { CipherTranslateService } from 'src/app/translate/cipher-translate.service';
import { CiphersFactoryPresenter } from '../../domain/boundaries/ciphers-factory.presenter';
import { CiphersFactoryFirstTabComponent } from '../ciphers-factory-first-tab/ciphers-factory-first-tab.component';
import {
    CiphersFactorySecondaryTabComponent,
    Line
} from '../ciphers-factory-secondary-tab/ciphers-factory-secondary-tab.component';
import { FormatMusicService } from './../../../../core/services/format-musica.service';
import { SpinnerService } from './../../../../core/services/spinner.service';
import { SystemDialogService } from './../../../../core/services/system-dilog.service';
import { Cipher } from './../../../songbook/domain/models/Cipher';

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

    tags: string[] = [];
    separatorKeysCodes: number[] = [ENTER, COMMA];

    constructor(
        private formBuilder: FormBuilder,
        private translate: CipherTranslateService,
        private dialog: SystemDialogService,
        private presenter: CiphersFactoryPresenter,
        private router: Router,
        private formatMusic: FormatMusicService,
        private spinner: SpinnerService
    ) {
        this.formGroup = this.formBuilder.group({
            title: ['', [Validators.required, Validators.minLength(3)]],
            lyric: ['', [Validators.required, Validators.minLength(100)]],
            cipher: [''],
            tone: [''],
            tags: [''],
        });

        this.translate.change('CIPHER_FACTORY.LYRICS', (t: string) => {
            this.firstTab = t;
        });
        this.translate.change('CIPHER_FACTORY.CIPHER', (t: string) => {
            this.secondaryTab = t;
        });

        if (this.router.getCurrentNavigation()?.extras.state) {
            const { cipher }: any =
                this.router.getCurrentNavigation()?.extras.state;
            this.state = cipher;
        }
    }

    ngOnInit(): void {
        this.toControl('lyric').valueChanges.subscribe((value) => {
            this.secondary?.transformText(value);
        });
        this.reflectTitle();

        setTimeout(() => {
            this.visualization();
        }, 100);
    }

    private reflectTitle() {
        let a = this.toControl('title').valueChanges.subscribe((value) => {
            a.unsubscribe();
            setTimeout(() => {
                this.toControl('title').setValue(value);
                this.reflectTitle();
            }, 0);
        });
    }

    toControl(formControlName: string): FormControl {
        return this.formGroup.get(formControlName) as FormControl;
    }

    save(): void {
        if (this.formGroup.valid) {
            const music = this.formGroup.getRawValue();
            music.cipher = JSON.stringify(music.cipher);
            music.tags = this.tags.reduce((accu, curr) => {
                accu = accu ? accu + ',' + curr : accu + curr;
                return accu;
            }, '');

            music.lyric = this.formatMusic
                .brackText(music.lyric)
                .filter((value) => value.type !== 'cipher')
                .reduce((accu: string, curr: Line) => {
                    accu = accu
                        ? accu + '\n' + curr.content
                        : '' + curr.content;
                    return accu;
                }, '');

            if (this.id) {
                music.id = this.id;
            }
            this.spinner.on();

            this.presenter.save(music).subscribe(
                (reponse) => {
                    this.state = reponse;
                    this.visualization();
                    this.dialog.sucess({
                        message: this.translate.getWithArgs(
                            'MESSAGE.SAVE_SUCCESS',
                            { arg: this.translate.get('CIPHER_FACTORY.CIPHER') }
                        ),
                    });
                },
                () => {},
                () => {
                    this.spinner.off();
                }
            );
        } else {
            this.dialog.warn({
                message:
                    'Antes de salvar preencha todos os campos obrigatórios!',
            });
        }
    }

    visualization() {
        if (this.state) {
            this.visualizarionMode = true;
            this.id = this.state!.id;
            this.tags = this.state!.tags?.split(',');
            this.toControl('lyric').setValue(this.state!.lyric);
            this.toControl('title').setValue(this.state.title);
            this.toControl('tone').setValue(this.state.tone);
            setTimeout(() => {
                this.secondary?.emitterChangeText(
                    JSON.parse(this.state!.cipher)
                );
            }, 200);
        }
    }

    new(): void {
        this.visualizarionMode = !this.visualizarionMode;

        this.formGroup.reset();
        this.id = '';
        this.state = undefined;
    }

    exclude(): void {
        this.dialog.warn({
            subtitle: 'Excluir?',
            message: 'Tem certeza que deseja seguir com essa operação!',
            callback: () => {
                this.spinner.on();
                this.presenter.delete(this.id!).subscribe(
                    (response) => {
                        this.router.navigate(['ciphers']);
                    },
                    () => {},
                    () => {
                        this.spinner.off();
                    }
                );
            },
        });
    }

    remove(tagRemove: string): void {
        this.tags = this.tags.filter((tag) => tag !== tagRemove);
    }

    add(event: MatChipInputEvent): void {
        const value = (event.value || '').trim();
        if (value && !this.tags.includes(value)) {
            this.tags.push(value.toUpperCase());
        }
        event.chipInput!.clear();
    }
}
