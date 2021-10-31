import { DefaultPresentMusicGateway } from './default-present-music.gateway';
import { PresentMusicRepository } from './present-music.repository';
import { NgModule } from '@angular/core';
import { PresentMusicGateway } from '../domain/boundaries/present-music.presenter';

@NgModule({
    providers: [
        PresentMusicRepository,
        {
            provide: PresentMusicGateway,
            useClass: DefaultPresentMusicGateway
        }
    ],
})
export class PresentMusicDataModule { }
