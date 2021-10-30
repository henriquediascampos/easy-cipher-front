import { MatRippleModule } from '@angular/material/core';
import { ResizeDirective } from './../directives/resize.directive';
import { HoverInteractAllStringDirective } from './../directives/hover-interact-all-string.directive';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuitarArmComponent } from './guitar-arm/guitar-arm.component';

@NgModule({
    declarations: [GuitarArmComponent, HoverInteractAllStringDirective, ResizeDirective],
    exports: [GuitarArmComponent],
    imports: [
        CommonModule,
        MatIconModule,
        MatButtonModule,
        MatRippleModule
    ],
})
export class GuitarArmPresenterModule {}
