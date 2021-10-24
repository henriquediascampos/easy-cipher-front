import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of, Subject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MusicalScaleService } from '../../../../core/services/musical-scale.service';
import {
    DialogSetNoteComponent,
    Scale,
} from '../dialog-set-note/dialog-set-note.component';
import { FormatMusicService } from './../../../../core/services/format-musica.service';

export declare type TypeLine = 'text' | 'cipher' | 'empty';
export interface Line {
    type: TypeLine;
    content: string;
}

@Component({
    selector: 'ec-secondary-tab',
    templateUrl: './ciphers-factory-secondary-tab.component.html',
    styleUrls: ['./ciphers-factory-secondary-tab.component.sass'],
})
export class CiphersFactorySecondaryTabComponent implements OnInit {
    value = '';
    maxLengthLine = 70;

    @HostBinding('class') clazz = 'container column padding-16';
    filteredTones?: Observable<Scale[]>;

    text!: Observable<Line[]>;
    _text = new Subject<Line[]>();
    textNotify = this._text.asObservable();

    @Input()
    set formGroup(value: FormGroup) {
        this._formGroup = value;
    }
    _formGroup!: FormGroup;

    @Input()
    set toneName(value: string) {
        this._toneName = value;
    }
    _toneName!: string;

    @Input()
    set cipherName(value: string) {
        this._cipherName = value;
    }
    _cipherName!: string;

    _disable = false;

    public disable(value: boolean) {
        this._disable = value;
    }

    constructor(
        public dialog: MatDialog,
        private scale: MusicalScaleService,
        private format: FormatMusicService
    ) {
        this.textNotify.subscribe((change) => {
            this.text = of(change).pipe(
                startWith([]),
                map((line) => line)
            );
        });
    }

    ngOnInit(): void {
        this.scale.getScale().subscribe((scaleOptions) => {
            this.filteredTones = this._formGroup
                .get(this._toneName)
                ?.valueChanges.pipe(
                    startWith(''),
                    map((value: string) =>
                        scaleOptions.filter(
                            (option) =>
                                !!option
                                    .toUpperCase()
                                    .includes(value.toUpperCase())
                        )
                    )
                );
        });
    }

    transformText(value: string): Line[] {
        const newtext = this.format.transformText(value, this.maxLengthLine);

        if (this.text) {
            this.text.subscribe((value) => {
                this.emitterChangeText(
                    newtext.map((line, i) => {
                        if (
                            line.type === 'cipher' &&
                            line.content.trim().length === 0
                        ) {
                            return value.length && value[i] ? value[i] : line;
                        }
                        return line;
                    })
                );
            });
        } else {
            this.emitterChangeText(newtext);
        }

        return newtext;
    }

    emitterChangeText(newText: Line[]): void {
        this._formGroup.get(this._cipherName)?.setValue(newText);
        this._text.next(newText);
    }

    splitLine(line: string): string[] {
        return this.format.splitLine(line);
    }

    alterChar(indexLine: number, indexChar: number): void {
        if (!this._disable) {
            this.dialog.open(DialogSetNoteComponent, {
                width: '550px',
                height: '235px',
                data: {
                    callback: (value: string) => {
                        this.text
                            .pipe(
                                map((text) => {
                                    return text.map((line, index) => {
                                        if (index === indexLine) {
                                            line.content = this.splitLine(
                                                line.content
                                            )
                                                .map((char, i) => {
                                                    if (indexChar === i) {
                                                        return value;
                                                    }
                                                    return char;
                                                })
                                                .reduce(
                                                    (accu, curr) => accu + curr
                                                );
                                        }
                                        return line;
                                    });
                                })
                            )
                            .subscribe((newtext) => {
                                this.emitterChangeText(newtext as Line[]);
                            });
                    },
                },
            });
        }
    }

    backTone(): void {
        this.scale
            .backTone(this._formGroup.get(this._toneName)?.value)
            .then((value) => {
                this._formGroup.get(this._toneName)?.setValue(value);
            });

        const newText = this._formGroup
            .get(this._cipherName)
            ?.value.map((line: Line) => {
                if (line.type === 'cipher') {
                    line.content = this.scale.changeNotes(line.content, 'back');
                }
                return line;
            });

        this.emitterChangeText(newText);
    }

    nextTone(): void {
        this.scale
            .nextTone(this._formGroup.get(this._toneName)?.value)
            .then((value) => {
                this._formGroup.get(this._toneName)?.setValue(value);
            });

        const newText = this._formGroup
            .get(this._cipherName)
            ?.value.map((line: Line) => {
                if (line.type === 'cipher') {
                    line.content = this.scale.changeNotes(line.content, 'next');
                }
                return line;
            });

        this.emitterChangeText(newText);
    }
}
