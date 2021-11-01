import { SystemDialogService } from './../../../../core/services/system-dilog.service';
import { SpinnerService } from './../../../../core/services/spinner.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { SongbookPresenter } from '../../domain/boundaries/songbook.presenter';
import { CustomCipher } from './../../domain/models/CustomCipher';
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
    musicFiltered?: Observable<CustomCipher[]>;
    id!: string;
    permitedExcludeCipher = false;

    constructor(
        private presenter: SongbookPresenter,
        private route: ActivatedRoute,
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
    }

    loadSongbook() {
        this.spinner.on();
        this.presenter.findById(this.id).subscribe(
            (response) => {
                this.title = response.title;
                this.musicFiltered = this.filterControl.valueChanges.pipe(
                    startWith(''),
                    map((value: string) =>
                        response.ciphers.filter(
                            (option) =>
                                !!option.cipher.title
                                    .toUpperCase()
                                    .includes(value.toUpperCase()) ||
                                !!option.cipher.lyric
                                    .toUpperCase()
                                    .includes(value.toUpperCase())
                        )
                    )
                );
            },
            () => {},
            () => {
                this.spinner.off();
            }
        );
    }

    showDialogAdd(): void {
        this.dialog.open(DialogAddCipherComponent, {
            width: '600px',
            height: '300px',
            data: {
                songbook: this.id,
                callback: () => {
                    this.loadSongbook();
                },
            },
        });
    }

    edit() {
        this.permitedExcludeCipher = !this.permitedExcludeCipher;
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
}
