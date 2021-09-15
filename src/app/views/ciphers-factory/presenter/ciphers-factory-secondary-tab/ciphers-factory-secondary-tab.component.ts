import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { from, Observable, of, Subject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MusicalScaleService } from '../../../../core/services/musical-scale.service';
import { DialogSetNoteComponent, Scale } from '../dialog-set-note/dialog-set-note.component';

export declare type TypeLine = 'text' | 'cipher' | 'empty';
export interface Line {
    type: TypeLine;
    content: string;
}

@Component({
    selector: 'ec-secondary-tab',
    templateUrl: './ciphers-factory-secondary-tab.component.html',
    styleUrls: ['./ciphers-factory-secondary-tab.component.sass']
})
export class CiphersFactorySecondaryTabComponent implements OnInit {

    value = ''

    @HostBinding('class') clazz = 'container column padding-16'
    filteredTones?: Observable<Scale[]>

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

    constructor(public dialog: MatDialog, private scale: MusicalScaleService) {
        this.textNotify.subscribe(change => {
            this.text = of(change).pipe(
                startWith([]),
                map(line => line)
            );
        });
    }

    ngOnInit(): void {
        this.scale.getScale().subscribe(scaleOptions => {
            this.filteredTones = this._formGroup.get(this._toneName)?.valueChanges.pipe(
                startWith(''),
                map((value: string) => scaleOptions.filter(option => !!option.toLowerCase().includes(value.toUpperCase()))))
        })

        this._formGroup.get(this._toneName)?.
            valueChanges.subscribe(value => {
                console.log(value);
            });
    }

    transformText(value: string): Line[] {
        const maxLengthLine = 70;
        const lyricLines = value.split('\n').map<Line>(line => ({
            type: this.checkTypeLine(line),
            content: this.formatContent(line)
        }));

        const newtext: Line[] = [];
        let beforLine: TypeLine = lyricLines.length === 0 || lyricLines[0].type === 'text' ? 'text' : 'cipher';

        for (const currentLine of lyricLines) {
            if (beforLine === 'text' && currentLine.type === 'text') {
                newtext.push({
                    content: Array.from(Array(maxLengthLine).keys()).reduce((a, b) => ' ' + a, ''),
                    type: 'cipher'
                })
            }

            if (currentLine.type === 'cipher') {
                const aditionalWitheSpace = maxLengthLine - currentLine.content.length;
                currentLine.content = currentLine.content + Array.from(Array(aditionalWitheSpace).keys()).reduce((a, b) => ' ' + a, '')
            }

            newtext.push(currentLine)
            beforLine = currentLine.type;
        }

        if (this.text) {
            this.text.subscribe(
                value => {
                    this.changeText(
                        newtext.map((line, i) => {
                            if (line.type === 'cipher' && line.content.trim().length === 0) {
                                return value.length && value[i] ? value[i] : line;
                            }
                            return line;
                        }));
                }
            );
        } else {
            this.changeText(newtext);
        }

        return newtext;
    }
    formatContent(line: string): string {
        return this.validateContent(line);
    }

    changeText(newText: Line[]): void {
        this._formGroup.get(this._cipherName)?.setValue(newText);
        this._text.next(newText);
    }

    validateContent(value: string): string {
        return value.length === 0 ? '' : value;
    }

    checkTypeLine(value: string): TypeLine {
        if (value.length === 0 || value.trim().length === 0) {
            return 'text'
        }
        return /[A-Z]{1}(\s|[m|M|/|#|b|&]*)/.test(value) && /\s{5,}/.test(value) ? 'cipher' : 'text';
    }

    splitLine(line: string): string[] {
        return line.split('').reduce((accu: any[], curr) => {
            if (accu.length > 0 && !/\s/.test(accu[accu.length - 1]) && !/\s/.test(curr)) {
                accu[accu.length - 1] = accu[accu.length - 1] + curr;
            } else {
                accu.push(curr);
            }
            return accu;
        }, [])
    }

    alterChar(indexLine: number, indexChar: number): void {
        if (!this._disable) {
            this.dialog.open(DialogSetNoteComponent, {
                width: '350px',
                height: '450px',
                data: {
                    callback: (value: string) => {
                        this.text.pipe(
                            map(text => {
                                return text.map((line, index) => {
                                    if (index === indexLine) {
                                        line.content = this.splitLine(line.content).map((char, i) => {
                                            if (indexChar === i) {
                                                return value;
                                            }
                                            return char;
                                        }).reduce((accu, curr) => accu + curr)

                                    }
                                    return line;
                                })
                            })
                        ).subscribe((newtext) => {
                            this.changeText(newtext as Line[]);
                        });
                    }
                }
            });
        }

    }

    backTone(): void {
        this.scale.backTone(this._formGroup.get(this._toneName)?.value).then(value => {
            this._formGroup.get(this._toneName)?.setValue(value);
        })
    }

    nextTone(): void {
        this.scale.nextTone(this._formGroup.get(this._toneName)?.value).then(value => {
            this._formGroup.get(this._toneName)?.setValue(value);
        })
    }

}
