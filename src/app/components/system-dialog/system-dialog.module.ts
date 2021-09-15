import { NgModule } from '@angular/core';
import { SystemDialogPresenterModule } from './presenter/system-dialog.presenter.module';

@NgModule({
    imports: [
        SystemDialogPresenterModule
    ],
    exports: [
        SystemDialogPresenterModule
    ]
})
export class SystemDialogModule { }
