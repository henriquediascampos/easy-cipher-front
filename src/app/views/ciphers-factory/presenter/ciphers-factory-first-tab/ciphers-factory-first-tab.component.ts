import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'ec-first-tab',
    templateUrl: './ciphers-factory-first-tab.component.html',
    styleUrls: ['./ciphers-factory-first-tab.component.sass']
})
export class CiphersFactoryFirstTabComponent implements OnInit {
    @HostBinding('class') clazz = 'container column padding-16'
    value = ''

    @Input()
    set formGroup(value: FormGroup) {
        this._formGroup = value;
    }
    _formGroup!: FormGroup;

    @Input()
    set lyricsName(value: string) {
        this._lyricsName = value;
    }
    _lyricsName!: string;


    constructor() { }

    ngOnInit(): void { }

}
