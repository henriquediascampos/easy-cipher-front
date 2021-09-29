import { NgModule } from '@angular/core';
import { MusicCardPresenterModule } from './presenter/music-card.presenter.module';


@NgModule({
    imports: [MusicCardPresenterModule],
    exports: [MusicCardPresenterModule],
})
export class MusicCardModule { }
