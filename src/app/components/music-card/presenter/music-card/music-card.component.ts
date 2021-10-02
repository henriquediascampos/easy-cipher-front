import { Music } from './../../domain/models/Music';
import { Router } from '@angular/router';
import { Component, HostBinding, OnInit, ViewChild, ElementRef, Input } from '@angular/core';

@Component({
    selector: 'ec-music-card',
    templateUrl: './music-card.component.html',
    styleUrls: ['./music-card.component.sass']
})
export class MusicCardComponent implements OnInit {

    @HostBinding('class') _class = 'container';
    toggleClass: boolean = false;

    @ViewChild('card') card!: ElementRef;
    @Input() music!: Music;
    constructor(private router: Router) { }

    ngOnInit(): void {
    }

    presentMusic(music: Music): void {
        (this.card.nativeElement as HTMLElement).classList.add('navigate');
        setTimeout(() => {
            this.router.navigate(['present-music'], {
                queryParams: music
            });
        }, 650);

    }
}
