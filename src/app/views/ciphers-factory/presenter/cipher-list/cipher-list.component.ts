import { Cipher } from './../../domain/models/Cipher';
import { startWith, map } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { CiphersFactoryPresenter } from '../../domain/boundaries/ciphers-factory.presenter';

@Component({
    selector: 'ec-cipher-list',
    templateUrl: './cipher-list.component.html',
    styleUrls: ['./cipher-list.component.sass']
})
export class CipherListComponent implements OnInit {
    title!: string;
    ciphers?: Observable<Cipher[]>
    filter = new FormControl(['']);

    constructor(
        private presenter: CiphersFactoryPresenter
    ) {

    }

    ngOnInit(): void {
        this.loadCiphers();
    }

    loadCiphers(): void {
        this.presenter.findByAll({}).subscribe((response) => {
            console.log(response);

            this.ciphers = this.filter.valueChanges.pipe(
                startWith(''),
                map((value: string) => response.filter(option => !!option.title.toUpperCase().includes(value.toUpperCase()))))
        });
    }

}
