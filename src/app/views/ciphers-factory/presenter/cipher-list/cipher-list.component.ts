import { RequestFilterService } from './request-filter.service';
import { SpinnerService } from './../../../../core/services/spinner.service';
import { Cipher } from './../../domain/models/Cipher';
import { startWith, map } from 'rxjs/operators';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { Component, AfterViewInit } from '@angular/core';
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
    formGroup: FormGroup;

    constructor(
        private presenter: CiphersFactoryPresenter,
        private translate: CipherTranslateService,
        private spinner: SpinnerService,
        private builder: FormBuilder,
        private requestFilter: RequestFilterService
    ) {
        this.translate.change('CIPHER_FACTORY.TITLE', (t: string) => {
            this.title = t;
        });

        this.formGroup = this.builder.group({
            between: this.builder.group({
                field: 'dataTransferencia',
                startdate: [''],
                enddate: [''],
            }),
            likeunidadeAtendimentoOrigem: this.builder.group({
                descricao: [''],
            }),
            likeunidadeAtendimentoDestino: this.builder.group({
                descricao: [''],
            }),
            status: [''],
        });
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.loadCiphers();
        }, 300);
    }

    loadCiphers(): void {
        const filter = this.requestFilter.makeFilterForm(this.formGroup);
        console.log(filter);
        console.log(JSON.stringify(filter));

        this.spinner.on();
        this.presenter.findByAll({}).subscribe(
            (response) => {
                this.ciphers = this.filter.valueChanges.pipe(
                    startWith(''),
                    map((value: string) => response.filter((option) => !!option.title.toUpperCase().includes(value.toUpperCase())))
                );
            },
            (error) => {
                console.log(error);
            },
            () => {
                this.spinner.off();
            }
        );
    }
}
