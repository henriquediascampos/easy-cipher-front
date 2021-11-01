import { PresentMusicDomainModule } from './domain/present-music.domain.module';
import { PresentMusicDataModule } from './data/present-music.data.module';
import { NgModule } from '@angular/core';
import { PresentMusicPresenterModule } from './presenter/present-music.presenter.module';

@NgModule({
    imports: [PresentMusicPresenterModule, PresentMusicDataModule, PresentMusicDomainModule]
})
export class PresentMusicModule { }
