import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable()
export class FocusService {

    constructor() { }

    validateFocus(formGroup: FormGroup, formcontrolnameFocus: string[]): void {
        for (const key of formcontrolnameFocus) {
            if (formGroup.get(key)?.invalid) {
                this.focus(key);
                break;
            }
        }
    }

    focus(key: string): void {
        const invalidControl = document.querySelector('[formcontrolname="' + key + '"]') as HTMLElement;

        if (invalidControl) {
            setTimeout(() => {
                invalidControl.focus();
            }, 20);
        }
    }

}
