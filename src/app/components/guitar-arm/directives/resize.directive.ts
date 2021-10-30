import { Directive, ElementRef, DoCheck, AfterViewInit, Input, OnChanges, OnDestroy } from '@angular/core';

@Directive({
    selector: '[ec-resize]',
})
export class ResizeDirective implements OnDestroy, AfterViewInit {

    @Input('ec-resize') callback!: any

    resizeObserver = new ResizeObserver(() => {
        this.callback((this.el.nativeElement as HTMLElement));
    })

    constructor(private el: ElementRef) {}


    ngAfterViewInit(): void {
        this.resizeObserver.observe((this.el.nativeElement as HTMLElement))
    }

    ngOnDestroy(): void {
        this.resizeObserver.unobserve((this.el.nativeElement as HTMLElement))
    }
}
