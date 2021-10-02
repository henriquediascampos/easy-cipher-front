import { ContainerModule } from './../../../components/container/container.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from './../../../core/core.module';
import { PresentMusicRoutingModule } from './present-music.routing';
import { PresentMusicComponent } from './present-music/present-music.component';
import { MatDividerModule } from '@angular/material/divider';



@NgModule({
    declarations: [
        PresentMusicComponent
    ],
    imports: [
        CommonModule,
        PresentMusicRoutingModule,
        CoreModule,
        ContainerModule,
        MatDividerModule
    ]
})
export class PresentMusicPresenterModule { }
