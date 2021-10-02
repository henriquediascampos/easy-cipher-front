import { SongbookDataModule } from './data/songbook.data.module';
import { SongbookDomainModule } from './domain/songbook.domain.module';
import { NgModule } from '@angular/core';
import { SongbookPresenterModule } from './presenter/songbook.presenter.module';



@NgModule({
    imports: [
        SongbookPresenterModule,
        SongbookDomainModule,
        SongbookDataModule
    ]
})
export class SongbookModule { }
