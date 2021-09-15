import { CoreModule } from './../../../core/core.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from './container/container.component';

@NgModule({
    declarations: [
        ContainerComponent
    ],
    exports: [
        ContainerComponent
    ],
  imports: [
        CommonModule,
        TranslateModule,
        MatToolbarModule,
        CoreModule
    ]
})
export class ContainerPresenterModule { }
