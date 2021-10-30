import { DefaultDialogChordPresenter } from './default-dialog-chord.presenter';
import { DialogChordComponent } from './dialog-chord/dialog-chord.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CoreModule } from './../../../core/core.module';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GuitarArmModule } from './../../guitar-arm/guitar-arm.module';
import { ContainerModule } from './../../container/container.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogChordPresenter } from '../domain/boudaries/dialog-chord.presenter';

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
        MatToolbarModule,
        MatDialogModule,
    ],
    exports: [DialogChordComponent],
    providers: [
        {
            provide: DialogChordPresenter,
            useClass: DefaultDialogChordPresenter
        }
    ]
})
export class DialogChordPresenterModule {}
