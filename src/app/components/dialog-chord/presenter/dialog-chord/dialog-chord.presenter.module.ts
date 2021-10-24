import { MatToolbarModule } from '@angular/material/toolbar';
import { CoreModule } from './../../../../core/core.module';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GuitarArmModule } from './../../../guitar-arm/guitar-arm.module';
import { ContainerModule } from './../../../container/container.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogChordComponent } from './dialog-chord.component';

@NgModule({
    declarations: [DialogChordComponent],
    imports: [
        CommonModule,
        ContainerModule,
        GuitarArmModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        TranslateModule,
        CoreModule,
        MatToolbarModule
    ],
    exports: [DialogChordComponent],
})
export class DialogChordPresenterModule {}
