import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { SongbookPresenter } from '../../domain/boundaries/songbook.presenter';
import { SpinnerService } from './../../../../core/services/spinner.service';
import { SystemDialogService } from './../../../../core/services/system-dilog.service';
import { CustomCipher } from './../../domain/models/CustomCipher';
import { Songbook } from './../../domain/models/Songbook';
import { DialogAddCipherComponent } from './../dialog-add-cipher/dialog-add-cipher.component';

@Component({
    selector: 'ec-songbook',
    templateUrl: './songbook.component.html',
    styleUrls: ['./songbook.component.sass'],
})
export class SongbookComponent implements OnInit {
    title = '';
    panelOpenState = false;
    filterControl = new FormControl(['']);
    filterTagControl = new FormControl(['']);
    musicFiltered?: Observable<CustomCipher[]>;
    id!: string;
    permitedEdit = false;

    _tags: string[] = [];
    get tags() {
        return this._tags;
    }
    set tags(tags: string[]) {
        this._tags = tags;
        this._tagChange.next(this._tags);
    }

    private _tagChange = new Subject<any>();
    tagChange = this._tagChange.asObservable();

    separatorKeysCodes: number[] = [ENTER, COMMA];

    songbook!: Songbook;

    constructor(
        private presenter: SongbookPresenter,
        private route: ActivatedRoute,
        private router: Router,
        private dialog: MatDialog,
        private systemDialog: SystemDialogService,
        private spinner: SpinnerService
    ) {}

    ngOnInit(): void {
        this.route.queryParams.subscribe((params) => {
            this.id = params['id'];
            setTimeout(() => {
                this.loadSongbook();
            }, 300);
        });

        this.tagChange.subscribe((a) => {
            this.musicFiltered = this.filterControl.valueChanges.pipe(
                startWith(''),
                map((value: string) => this.filter(this.removeAccents(typeof this.filterControl.value === 'string' ? this.filterControl.value : "")))
            );
        });

        // setTimeout(() => {
            // this.filterControl.setValue('SOLDADO DO SENHOR');

            // this.router.navigate(['present-music', '45eea326-58f2-c39c-32de-36a756b290b4']);

        // }, 400);
    }

    loadSongbook() {
        this.spinner.on();
        this.presenter.findById(this.id).subscribe(
            (response) => {
                this.songbook = response;
                this.title = response.title;
                this.musicFiltered = this.filterControl.valueChanges.pipe(
                    startWith(''),
                    map((value: string) => this.filter(this.removeAccents(value)))
                );
            },
            () => {},
            () => {
                this.spinner.off();
            }
        );
    }

    private filter(value: string): any {
        return this.songbook.ciphers.filter((option) => {
            const matchFilter =
                !!this.removeAccents(option.cipher.title)
                    .toUpperCase()
                    .includes(value.toUpperCase()) ||
                !!this.removeAccents(option.cipher.lyric)
                    .toUpperCase()
                    .includes(value.toUpperCase());

            const matchTags =
                !this.tags.length ||
                this.tags.reduce<boolean>((accu, curr) => {
                    return accu && option.cipher.tags.split(',').includes(curr)
                }, true);

            if (matchFilter && matchTags) {
                return true
            } else {
                return false
            }
        });
    }

    private removeAccents(value: string) {
        return value ? value.normalize('NFD').replace(/[\u0300-\u036f]/g, '') : "";
    }

    showDialogAdd(id?: string): void {
        this.dialog.open(DialogAddCipherComponent, {
            width: '600px',
            height: '300px',
            data: {
                songbook: this.id,
                idCustomCipher: id,
                callback: () => {
                    this.loadSongbook();
                },
            },
        });
    }

    editCipher() {
        this.permitedEdit = !this.permitedEdit;
    }

    edit(id: string) {
        this.showDialogAdd(id);
    }

    delete(id: string): void {
        this.systemDialog.warn({
            subtitle: 'Excluir?',
            message: 'Tem certeza que deseja seguir com essa operação!',
            callback: () => {
                this.spinner.on();
                this.presenter.remove(id).subscribe(
                    (response) => {
                        this.loadSongbook();
                    },
                    () => {},
                    () => {
                        this.spinner.off();
                    }
                );
            },
        });
    }

    removeTag(tagRemove: string): void {
        this.tags = this.tags.filter((tag) => tag !== tagRemove);
    }

    addTag(event: MatChipInputEvent): void {
        const value = (event.value || '').trim();
        if (value && !this.tags.includes(value)) {
            this.tags = [...this.tags, value.toUpperCase()];
        }
        event.chipInput!.clear();
    }
}
