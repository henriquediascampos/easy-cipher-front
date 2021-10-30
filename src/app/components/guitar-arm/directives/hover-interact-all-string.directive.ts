import { Directive, HostListener, Input } from '@angular/core';

@Directive({
    selector: '[hoverInteract]',
})
export class HoverInteractAllStringDirective {
    @Input('hoverInteract') strings!: HTMLElement;

    @HostListener('click') onClick() {
        this.interactClick();
    }

    @HostListener('mouseover') mouseover() {
        this.interactOver();
    }

    @HostListener('mouseout') mouseout() {
        this.interactOut();
    }

    constructor() {}

    private interactOver(): void {
        for (const key in this.strings.children) {
            const string = this.strings.children[key];
            if(!string.classList?.contains('interact')) {
                string.classList?.add('interact')
            }
        }
    }

    private interactOut(): void {
        for (const key in this.strings.children) {
            const string = this.strings.children[key];
            if(string.classList?.contains('interact')) {
                string.classList?.remove('interact')
            }
        }
    }

    private interactClick(): void {

        for (const key in this.strings.children) {
            const string = this.strings.children[key];
            const flag = string.lastElementChild as HTMLElement;
            flag?.click();
        }
    }
}
