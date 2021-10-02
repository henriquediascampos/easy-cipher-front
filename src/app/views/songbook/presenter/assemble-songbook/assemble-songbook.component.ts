import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { SongbookPresenter } from '../../domain/boundaries/songbook.presenter';
import { Songbook } from './../../domain/models/Songbook';

@Component({
    selector: 'ec-assemble-songbook',
    templateUrl: './assemble-songbook.component.html',
    styleUrls: ['./assemble-songbook.component.sass']
})
export class AssembleSongbookComponent implements OnInit {

    musicFiltered?: Observable<Songbook[]>;
    optionsVision?: Observable<string[]>;
    options: string[];
    songbookForm: FormGroup;

    constructor(private presenter: SongbookPresenter, private formBuilder: FormBuilder, private router: Router) {
        this.songbookForm = this.formBuilder.group({
            title: ['', [Validators.required, Validators.minLength(3)]],
            vision: ['', [Validators.required]]
        });

        this.options = ['PRIVATE', 'PUBLIC'];

        this.optionsVision = this.songbookForm.get('vision')?.valueChanges.pipe(
            startWith(''),
            map((value: string) => this.options.filter(option => !!option.toUpperCase().includes(value.toUpperCase()))))
    }

    ngOnInit(): void {
        this.loadSongbooks();
    }
    loadSongbooks() {
        this.musicFiltered = this.presenter.findAll().pipe(
            startWith([]),
            map(value => {
                return value;
            })
        );
    }

    save(): void {
        if (this.songbookForm.valid) {
            this.presenter.save(this.songbookForm.getRawValue()).subscribe(response => {
                this.loadSongbooks();
            })
        }
    }

    selectSongbook(card: HTMLElement, id: string): void {
        card.classList.add('navigate');
        setTimeout(() => {
            this.router.navigate(['songbook/songbook'], {
                queryParams: {id}
            });
        }, 600);

    }

    delete(id: string) {
        this.presenter.delete(id).subscribe( value => {

        });
    }
}
