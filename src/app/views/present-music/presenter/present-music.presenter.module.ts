import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from './../../../core/core.module';
import { PresentMusicRoutingModule } from './present-music.routing';
import { PresentMusicComponent } from './present-music/present-music.component';



@NgModule({
    declarations: [
        PresentMusicComponent
    ],
    imports: [
        CommonModule,
        PresentMusicRoutingModule,
        CoreModule
    ]
})
export class PresentMusicPresenterModule { }
