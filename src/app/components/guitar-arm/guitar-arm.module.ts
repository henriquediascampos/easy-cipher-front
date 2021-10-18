import { NgModule } from '@angular/core';
import { GuitarArmPresenterModule } from './presenter/guitar-arm.presenter.module';
import { HoverInteractAllStringDirective } from './directives/hover-interact-all-string.directive';

@NgModule({
    imports: [GuitarArmPresenterModule],
    exports: [GuitarArmPresenterModule],
})
export class GuitarArmModule {}
