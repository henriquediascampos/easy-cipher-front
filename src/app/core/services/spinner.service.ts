import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class SpinnerService {

    private spinnerChange = new Subject<boolean>();
    spinnerNotify = this.spinnerChange.asObservable();

    private blurBackground = new Subject<boolean>();
    blurBackgroundNotify = this.blurBackground.asObservable();

    constructor() {
    }

    async change(change: boolean): Promise<void> {
        this.spinnerChange.next(change);
        this.blurBackground.next(change);
    }

    async on(): Promise<void> {
        this.change(true);
    }

    async off(): Promise<void> {
        this.change(false);
    }

}
