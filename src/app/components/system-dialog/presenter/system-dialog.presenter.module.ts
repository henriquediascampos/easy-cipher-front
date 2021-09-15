import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TranslateModule } from '@ngx-translate/core';
import { CoreModule } from 'src/app/core/core.module';
import { SystemDialogComponent } from './system-dialog/system-dialog.component';

@NgModule({
    declarations: [
        SystemDialogComponent
    ],
    exports: [
        SystemDialogComponent
    ],
    imports: [
        CommonModule,
        TranslateModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        CoreModule,
        MatDialogModule,
        MatToolbarModule
    ],
})
export class SystemDialogPresenterModule { }
