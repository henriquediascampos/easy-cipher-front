import { Observable, Subject } from 'rxjs';
import { TypeLine } from 'src/app/components/types/TypeLine';
import { Injectable } from '@angular/core';

interface Line {
    type: TypeLine;
    content: string;
}

@Injectable()
export class FormatMusicService {

    text!: Observable<Line[]>;
    _text = new Subject<Line[]>();
    textNotify = this._text.asObservable();

    constructor() { }

    changeText(newText: Line[]): void {
        this._text.next(newText);
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

    formatContent(line: string): string {
        return this.validateContent(line);
    }


    validateContent(value: string): string {
        return value.length === 0 ? '' : value;
    }


}
