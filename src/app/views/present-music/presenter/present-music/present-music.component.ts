import { Router } from '@angular/router';
import { Component, HostBinding, OnInit } from '@angular/core';
import { FormatMusicService } from './../../../../core/services/format-musica.service';
import { Line } from './../../../ciphers-factory/presenter/ciphers-factory-secondary-tab/ciphers-factory-secondary-tab.component';

@Component({
    selector: 'ec-present-music',
    templateUrl: './present-music.component.html',
    styleUrls: ['./present-music.component.sass']
})
export class PresentMusicComponent implements OnInit {
    @HostBinding('class') _class = 'container full';
    text!: Line[];
    title!: string;

    constructor(private router: Router, private format: FormatMusicService) {
        if (this.router.getCurrentNavigation()?.extras.state) {
            const { param }: any = this.router.getCurrentNavigation()?.extras.state
            this.title = param.title;
            this.text = JSON.parse(param.cipher);
        }
    }

    ngOnInit(): void {

        // this.route.queryParams.subscribe(params => {
        //     this.title = params['title'];
        //     console.log(params);

        //     this.text = this.format.transformText(params['cipher'], 70);
        // });


    }

    splitLine(content: string): string[] {
        return this.format.splitLine(content);
    }

}
