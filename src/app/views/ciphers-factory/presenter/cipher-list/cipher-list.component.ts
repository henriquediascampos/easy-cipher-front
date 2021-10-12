import { SpinnerService } from './../../../../core/services/spinner.service';
import { Cipher } from './../../domain/models/Cipher';
import { startWith, map } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CiphersFactoryPresenter } from '../../domain/boundaries/ciphers-factory.presenter';
import { CipherTranslateService } from 'src/app/translate/cipher-translate.service';

@Component({
    selector: 'ec-cipher-list',
    templateUrl: './cipher-list.component.html',
    styleUrls: ['./cipher-list.component.sass'],
})
export class CipherListComponent implements AfterViewInit {
    title!: string;
    ciphers?: Observable<Cipher[]>;
    filter = new FormControl(['']);

    constructor(
        private presenter: CiphersFactoryPresenter,
        private translate: CipherTranslateService,
        private spinner: SpinnerService
    ) {
        this.translate.change('CIPHER_FACTORY.TITLE', (t: string) => {
            this.title = t;
        });
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.loadCiphers();
        }, 300);
    }

    loadCiphers(): void {
        this.spinner.on();
        this.presenter.findByAll({}).subscribe(
            (response) => {
                this.ciphers = this.filter.valueChanges.pipe(
                    startWith(''),
                    map((value: string) =>
                        response.filter(
                            (option) =>
                                !!option.title
                                    .toUpperCase()
                                    .includes(value.toUpperCase())
                        )
                    )
                );
            },
            error => {},
            () => {
                this.spinner.off();
            }
        );
    }
}
