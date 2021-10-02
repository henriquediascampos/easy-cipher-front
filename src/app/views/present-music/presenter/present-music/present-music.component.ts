import { Line } from './../../../ciphers-factory/presenter/ciphers-factory-secondary-tab/ciphers-factory-secondary-tab.component';
import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormatMusicService } from './../../../../core/services/format-musica.service';

@Component({
    selector: 'ec-present-music',
    templateUrl: './present-music.component.html',
    styleUrls: ['./present-music.component.sass']
})
export class PresentMusicComponent implements OnInit {
    @HostBinding('class') _class = 'container full';
    text!: Line[];
    title!: string;

    constructor(private route: ActivatedRoute, private format: FormatMusicService) { }

    ngOnInit(): void {

        this.route.queryParams.subscribe(params => {
            this.title = params['title'];
            this.text = this.format.transformText(params['cipher'], 70);
        });
    }

    splitLine(content: string): string[] {
        return this.format.splitLine(content);
    }

}
