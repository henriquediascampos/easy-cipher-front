import { Cipher } from '../../domain/models/Cipher';
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
    @Input() music!: Cipher;
    constructor(private router: Router) { }

    ngOnInit(): void {
    }

    public animateSlide(route: string, param?: any) {
        (this.card.nativeElement as HTMLElement).classList.add('navigate');
        setTimeout(() => {
            this.router.navigate([route], {
                skipLocationChange: false,
                state: param
            });
        }, 600);

    }
}
