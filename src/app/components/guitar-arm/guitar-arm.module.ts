import { NgModule } from '@angular/core';
import { GuitarArmPresenterModule } from './presenter/guitar-arm.presenter.module';

@NgModule({
    imports: [GuitarArmPresenterModule],
    exports: [GuitarArmPresenterModule],
})
export class GuitarArmModule {}
