import { Component, HostBinding, OnInit } from '@angular/core';
import * as moment from 'moment';
import { SpinnerService } from './../../../../core/services/spinner.service';

@Component({
    selector: 'ec-spinner',
    templateUrl: './spinner.component.html',
    styleUrls: ['./spinner.component.sass'],
})
export class SpinnerComponent implements OnInit {
    @HostBinding('style') style = 'position: absolute;';

    on = false;
    clazzOn = false;
    clazzColorECG = false;

    id!: number;

    constructor(private spinner: SpinnerService) {}

    ngOnInit(): void {
        this.spinner.spinnerNotify.subscribe((on) => {
            this.on = on;
            this.clazzOn = on;
            this.clazzColorECG = false;

            this.id = moment().unix();
            this.countdownChangeColorECG(on, this.id);
        });
    }

    countdownChangeColorECG(on: boolean, id: number): void {
        if (on) {
            setTimeout(() => {
                if (on && id === this.id) {
                    this.clazzColorECG = true;
                }
            }, 2535);
        }
    }
}
