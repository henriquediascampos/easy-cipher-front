import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
    selector: 'cipher-container',
    templateUrl: './container.component.html',
    styleUrls: ['./container.component.sass']
})
export class ContainerComponent implements OnInit {

    @HostBinding('class') clazz = 'container column full';
    @Input('title-container') title!: string;

    constructor() { }

    ngOnInit(): void {
    }

}
