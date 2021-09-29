import { ITENS } from './teste';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { map, startWith } from 'rxjs/operators';

@Component({
    selector: 'ec-music-book',
    templateUrl: './music-book.component.html',
    styleUrls: ['./music-book.component.sass']
})
export class MusicBookComponent implements OnInit {

    panelOpenState = false;
    filterControl = new FormControl(['']);
    musicFiltered?: Observable<{title: string, lyric: string}[]>;

    scaleOptions = [
        {
            title: 'Uma alegria diferente',
            lyric: 'hosanas ao rei Deus meu\n bendito tu és\n com vozes de jubilo...',
            cipher: 'E          B\nhosanas ao rei Deus meu\n         C#m\n bendito tu és\n com vozes de jubilo...'
        },
        {
            title: 'Salva-me oh el',
            lyric: 'salva-me oh El, tira minha dor\n cobre-me com seu manto\n aquece-me com seu amor...'
        }
    ];

    constructor() { }

    ngOnInit(): void {

        this.musicFiltered = this.filterControl.valueChanges.pipe(
            startWith(''),
            map((value: string) => this.scaleOptions.filter(option => !!option.title.toUpperCase().includes(value.toUpperCase()))))

    }

}
