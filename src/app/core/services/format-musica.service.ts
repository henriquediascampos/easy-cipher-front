import { Injectable } from '@angular/core';
import { TypeLine } from 'src/app/components/types/TypeLine';

interface Line {
    type: TypeLine;
    content: string;
}

@Injectable()
export class FormatMusicService {

    constructor() { }

    transformText(value: string, maxLengthLine: number): Line[] {
        const newtext: Line[] = [];

        if (value) {
            const lyricLines = this.brackText(value);
            const lengthLimit = this.setLengthLimit(lyricLines, maxLengthLine);

            let beforLine: TypeLine = lyricLines.length === 0 || lyricLines[0].type === 'text' ? 'text' : 'cipher';

            for (const currentLine of lyricLines) {
                if (beforLine === 'text' && currentLine.type === 'text') {
                    newtext.push({
                        content: Array.from(Array(lengthLimit).keys()).reduce((a, b) => ' ' + a, ''),
                        type: 'cipher'
                    })
                }

                if (currentLine.type === 'cipher') {
                    const aditionalWitheSpace = currentLine.content.length > lengthLimit ? currentLine.content.length : lengthLimit - currentLine.content.length;
                    currentLine.content = currentLine.content + Array.from(Array(aditionalWitheSpace).keys()).reduce((a, b) => ' ' + a, '')
                }

                newtext.push(currentLine)
                beforLine = currentLine.type;
            }
        }

        return newtext;
    }


    private setLengthLimit(lyricLines: Line[], maxLengthLine: number) {
        const lengthLimit = lyricLines
            .map(value => value.content.length)
            .reduce((accu, curr) => {
                if (curr > accu) {
                    accu = curr;
                }

                return accu;
            }, 0);

        return maxLengthLine - lengthLimit >= 10 ? maxLengthLine : lengthLimit + 10;
    }

    brackText(value: string): Line[] {
        return value.split('\n').map<Line>(line => ({
            type: this.checkTypeLine(line),
            content: this.formatContent(line)
        }));
    }

    checkTypeLine(value: string): TypeLine {
        if (value.length === 0 || value.trim().length === 0) {
            return 'text'
        }
        return /[A-Z]{1}(\s|[m|M|/|#|b|&|7]*)/.test(value) && /\s{5,}/.test(value) ? 'cipher' : 'text';
    }

    formatContent(value: string): string {
        return value.length === 0 ? '' : value;
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
}
