import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ContainerModule } from './../../../components/container/container.module';
import { MusicCardModule } from './../../../components/music-card/music-card.module';
import { MusicBookRoutingModule } from './music-book.routing';
import { MusicBookComponent } from './music-book/music-book.component';


@NgModule({
    declarations: [
        MusicBookComponent
    ],
    imports: [
        CommonModule,
        MusicBookRoutingModule,
        ContainerModule,
        MatExpansionModule,
        MatButtonModule,
        MatIconModule,
        MusicCardModule,
        MatInputModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatTooltipModule
    ]
})
export class MusicBookPresenterModule { }
