import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MusicCardComponent } from './music-card/music-card.component';


@NgModule({
    declarations: [MusicCardComponent],
    exports: [MusicCardComponent],
    imports: [CommonModule, MatButtonModule, MatIconModule],
})
export class MusicCardPresenterModule { }
