import { DefaultPresentMusicPresenter } from './default-present-music.presenter';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { ContainerModule } from './../../../components/container/container.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from './../../../core/core.module';
import { PresentMusicRoutingModule } from './present-music.routing';
import { PresentMusicComponent } from './present-music/present-music.component';
import { MatDividerModule } from '@angular/material/divider';
import { PresentMusicPresenter } from '../domain/boundaries/present-music.presenter';


@NgModule({
    declarations: [
        PresentMusicComponent
    ],
    imports: [
        CommonModule,
        PresentMusicRoutingModule,
        CoreModule,
        ContainerModule,
        MatDividerModule,
        TranslateModule,
        MatIconModule,
        MatInputModule,
        MatButtonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [{
        provide: PresentMusicPresenter,
        useClass: DefaultPresentMusicPresenter
    }]
})
export class PresentMusicPresenterModule { }
