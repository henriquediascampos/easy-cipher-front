import { CustomCipher } from './../../../songbook/domain/models/CustomCipher';
import { Location } from '@angular/common';
import { Component, HostBinding, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { FormatMusicService } from './../../../../core/services/format-musica.service';
import {
    MusicalScaleService,
    Note
} from './../../../../core/services/musical-scale.service';
import { Line } from './../../../ciphers-factory/presenter/ciphers-factory-secondary-tab/ciphers-factory-secondary-tab.component';
import { PresentMusicPresenter } from '../../domain/boundaries/present-music.gateway';

@Component({
    selector: 'ec-present-music',
    templateUrl: './present-music.component.html',
    styleUrls: ['./present-music.component.sass'],
})
export class PresentMusicComponent implements OnInit {
    @HostBinding('class') _class = 'container full';
    text!: Line[];
    title!: string;
    origemTone!: string;
    tone = new FormControl(['']);
    customCipher!: CustomCipher;

    constructor(
        private router: Router,
        private format: FormatMusicService,
        private scale: MusicalScaleService,
        private location: Location,
        private presenter: PresentMusicPresenter
    ) {
        if (this.router.getCurrentNavigation()?.extras.state) {
            const { customCipher, cipher, customTone }: any = this.router.getCurrentNavigation()?.extras.state;
            console.log(customCipher);
            this.customCipher = customCipher;
            this.title = cipher.title;
            this.origemTone = cipher.tone;
            this.tone.setValue(customTone);
            this.text = JSON.parse(cipher.cipher);
        } else {
            this.location.back();
        }
    }

    ngOnInit(): void {
        if (this.origemTone && this.origemTone !== this.tone.value) {
            setTimeout(() => {
                this.text = this.text.map((line) => {
                    if (line.type === 'cipher') {
                        line.content = this.scale.changeTone(
                            line.content,
                            this.origemTone,
                            this.tone.value
                        );
                    }
                    return line;
                });
            }, 20);
        }
    }

    splitLine(content: string): string[] {
        return this.format.splitLine(content);
    }

    backTone(): void {
        this.changeTone('back');
    }

    nextTone(): void {
        this.changeTone('next');
    }

    changeTone(change: 'back' | 'next') {
        if (change === 'back') {
            this.scale.backTone(this.tone.value as Note).then((value) => {
                this.tone.setValue(value);
                this.updateCustomTone(value);
            });
        } else {
            this.scale.nextTone(this.tone.value as Note).then((value) => {
                this.tone.setValue(value);
                this.updateCustomTone(value);
            });
        }

        const newText = this.text.map((line: Line) => {
            if (line.type === 'cipher') {
                line.content = this.scale.changeNotes(line.content, change);
            }
            return line;
        });

        this.text = newText;
    }

    updateCustomTone(newTone: string): void {
        this.customCipher.customTone = newTone;
        this.presenter.update(this.customCipher);
    }
}
