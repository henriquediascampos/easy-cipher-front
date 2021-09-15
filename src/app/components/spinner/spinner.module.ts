import { NgModule } from '@angular/core';
import { SpinnerPresenterModule } from './presenter/spinner.presenter.module';

@NgModule({
    imports: [SpinnerPresenterModule],
    exports: [SpinnerPresenterModule],
})
export class SpinnerModule {}
