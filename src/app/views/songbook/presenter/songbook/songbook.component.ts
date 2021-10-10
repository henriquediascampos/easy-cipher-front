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
    styleUrls: ['./songbook.component.sass']
})
export class SongbookComponent implements OnInit {
    title = '';
    panelOpenState = false;
    filterControl = new FormControl(['']);
    musicFiltered?: Observable<CustomCipher[]>;
    id!: string;

    constructor(
        private presenter: SongbookPresenter,
        private route: ActivatedRoute,
        private dialog: MatDialog
    ) {

    }

    ngOnInit(): void {

        this.route.queryParams.subscribe(params => {
            this.id = params['id'];
            this.loadSongbook();
        })
    }

    loadSongbook() {
        this.presenter.findById(this.id).subscribe((response) => {
            this.title = response.title;
            this.musicFiltered = this.filterControl.valueChanges.pipe(
                startWith(''),
                map((value: string) => response.ciphers.filter(option =>
                    !!option.cipher.title.toUpperCase().includes(value.toUpperCase())
                     || !!option.cipher.lyric.toUpperCase().includes(value.toUpperCase())
                    )));
        });
    }

    showDialogAdd(): void {
        this.dialog.open(DialogAddCipherComponent, {
            width: '600px',
            height: '300px',
            data: {
                songbook: this.id,
                callback: () => { this.loadSongbook(); }
            }
        });
    }

    edit() {

    }

}
