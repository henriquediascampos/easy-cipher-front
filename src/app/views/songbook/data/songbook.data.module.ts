import { DefaultSongBookGateway } from './default-songbook.gateway';
import { SongBookRepository } from './songbook.repository';
import { NgModule } from '@angular/core';
import { SongbookGateway } from '../domain/boundaries/songbook.gateway';


@NgModule({
    providers: [
        SongBookRepository,
        {
            provide: SongbookGateway,
            useClass: DefaultSongBookGateway
        }
    ],
})
export class SongbookDataModule { }
