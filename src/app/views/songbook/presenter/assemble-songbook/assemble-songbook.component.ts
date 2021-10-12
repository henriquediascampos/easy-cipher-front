import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CipherTranslateService } from 'src/app/translate/cipher-translate.service';
import { SongbookPresenter } from '../../domain/boundaries/songbook.presenter';
import { FocusService } from './../../../../core/services/focus.service';
import { SystemDialogService } from './../../../../core/services/system-dilog.service';
import { Songbook } from './../../domain/models/Songbook';

@Component({
    selector: 'ec-assemble-songbook',
    templateUrl: './assemble-songbook.component.html',
    styleUrls: ['./assemble-songbook.component.sass'],
})
export class AssembleSongbookComponent implements OnInit {
    musicFiltered?: Observable<Songbook[]>;
    optionsVision?: Observable<string[]>;
    options: string[];
    songbookForm: FormGroup;

    constructor(
        private presenter: SongbookPresenter,
        private formBuilder: FormBuilder,
        private focus: FocusService,
        private router: Router,
        private translate: CipherTranslateService,
        private dialog: SystemDialogService
    ) {
        this.songbookForm = this.formBuilder.group({
            title: ['', [Validators.required, Validators.minLength(3)]],
            vision: ['', [Validators.required]],
        });

        this.options = [
            this.translate.get('FORM.PRIVATE'),
            this.translate.get('FORM.PUBLIC'),
        ];

        this.optionsVision = this.songbookForm.get('vision')?.valueChanges.pipe(
            startWith(''),
            map((value: string) =>
                this.options.filter(
                    (option) =>
                        !!option.toUpperCase().includes(value.toUpperCase())
                )
            )
        );
    }

    ngOnInit(): void {
        this.loadSongbooks();
    }

    loadSongbooks() {
        this.musicFiltered = this.presenter.findAll().pipe(
            startWith([]),
            map((value) => {
                return value;
            })
        );
    }

    save(): void {
        if (this.songbookForm.valid) {
            const param = this.songbookForm.getRawValue() as Songbook;
            param.vision =
                param.vision === this.translate.get('FORM.PRIVATE')
                    ? 'PRIVATE'
                    : 'PUBLIC';
            this.presenter.save(param).subscribe((response) => {
                this.songbookForm.reset();
                this.loadSongbooks();
            });
        } else {
            this.dialog.warn({
                message: this.translate.get('FORM.COMPLETE_REQUIRED_FIELDS'),
                callback: () => {
                    this.focus.validateFocus(
                        this.songbookForm,
                        Object.getOwnPropertyNames(this.songbookForm.controls)
                    );
                },
            });
        }
    }

    selectSongbook(card: HTMLElement, id: string): void {
        card.classList.add('navigate');
        setTimeout(() => {
            this.router.navigate(['songbook/songbook'], {
                queryParams: { id },
            });
        }, 600);
    }

    delete(id: string) {
        this.dialog.warn({
            subtitle: 'Excluir?',
            message: 'Tem certeza que deseja seguir com essa operação!',
            callback: () => {
                this.presenter.delete(id).subscribe((response) => {
                    this.loadSongbooks();
                });
            },
        });
    }
}
