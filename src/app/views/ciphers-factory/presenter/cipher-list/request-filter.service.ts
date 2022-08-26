/* eslint-disable @typescript-eslint/ban-types */
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as moment from 'moment';

@Injectable()
export class RequestFilterService {
    makeFilterForm(formGroup: FormGroup): {} {
        const filter = Object.getOwnPropertyNames(formGroup.controls).reduce((accu: any, curr) => {
            const control = formGroup.get(curr);

            console.log(accu, curr, 'constructorName: ' + control?.constructor.name);
            if (curr === 'between') {
                this.makeFilterBetween(control as FormGroup, accu, curr);
            } else if (curr === 'ageGroup') {
                this.makeFilterAgeGroup(accu, curr, control as FormGroup);
            } else if (control?.constructor.name === 'FormGroup') {
                this.makeFilterCompose(accu, curr, control as FormGroup);
            } else {
                accu[curr] = control?.value;
            }
            return accu;
        }, {});

        Object.keys(filter).forEach((key) => !filter[key] && delete filter[key]);
        console.log(filter);

        return filter;
    }

    private makeFilterCompose(accu: any, curr: string, control: FormGroup): void {
        const subField = Object.keys(control.controls)[0];
        const value = control.get(subField)?.value;
        if (value) {
            accu[`${curr}.${subField}`] = value;
        }
    }

    private makeFilterAgeGroup(accu: any, curr: string, control: FormGroup): void {
        accu[curr] = `${control.get('field')?.value},${control.get('startAgeGroup')?.value},${control.get('endAgeGroup')?.value}`;
    }

    private makeFilterBetween(control: FormGroup, accu: any, curr: string): void {
        if ((control?.get('field') && control?.get('startdate')?.value, control?.get('enddate')?.value)) {
            accu[curr] = `${control.get('field')?.value},${moment(control.get('startdate')?.value).format('YYYY-MM-DD')},${moment(
                control.get('enddate')?.value
            ).format('YYYY-MM-DD')}`;
        }
    }
}
