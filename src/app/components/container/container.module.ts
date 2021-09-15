import { NgModule } from '@angular/core';
import { ContainerPresenterModule } from './presenter/container.presenter.module';



@NgModule({
  imports: [
    ContainerPresenterModule
  ],
  exports: [ContainerPresenterModule]
})
export class ContainerModule { }
