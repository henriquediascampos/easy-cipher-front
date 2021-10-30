import { DialogChordPresenterModule } from './presenter/dialog-chord.presenter.module';
import { DialogChordDomainModule } from './domain/dialog-chord.domain.module';
import { DialogChordDataModule } from './data/dialog-chord.data.module';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [DialogChordPresenterModule, DialogChordDataModule, DialogChordDomainModule],
    exports: [DialogChordPresenterModule],
})
export class DialogChordModule {}
