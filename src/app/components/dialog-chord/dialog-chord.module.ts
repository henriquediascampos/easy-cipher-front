import { DialogChordPresenterModule } from './presenter/dialog-chord/dialog-chord.presenter.module';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [DialogChordPresenterModule],
    exports: [DialogChordPresenterModule],
})
export class DialogChordModule {}
