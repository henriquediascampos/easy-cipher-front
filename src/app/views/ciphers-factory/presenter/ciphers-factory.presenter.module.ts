import { CipherTranslateModule } from './../../../translate/cipher-translate.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TranslateModule } from '@ngx-translate/core';
import { CoreModule } from 'src/app/core/core.module';
import { CiphersFactoryPresenter } from '../domain/boundaries/ciphers-factory.presenter';
import { ContainerModule } from './../../../components/container/container.module';
import { SystemDialogModule } from './../../../components/system-dialog/system-dialog.module';
import { CiphersFactoryFirstTabComponent } from './ciphers-factory-first-tab/ciphers-factory-first-tab.component';
import { CiphersFactorySecondaryTabComponent } from './ciphers-factory-secondary-tab/ciphers-factory-secondary-tab.component';
import { CiphersFactoryRouting } from './ciphers-factory.routing';
import { CiphersFactoryComponent } from './ciphers-factory/ciphers-factory.component';
import { DefaultCiphersFactoryPresenter } from './default-ciphers-factory.presenter';
import { DialogSetNoteComponent } from './dialog-set-note/dialog-set-note.component';


@NgModule({
    declarations: [CiphersFactoryComponent, DialogSetNoteComponent, CiphersFactoryFirstTabComponent, CiphersFactorySecondaryTabComponent],
    imports: [
        CommonModule,
        CiphersFactoryRouting,
        TranslateModule,
        CipherTranslateModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatIconModule,
        MatButtonModule,
        CoreModule,
        MatDialogModule,
        MatToolbarModule,
        MatAutocompleteModule,
        MatTabsModule,
        ContainerModule,
        MatProgressBarModule,
        MatCardModule,
        SystemDialogModule,
    ],
    providers: [
        {
            provide: CiphersFactoryPresenter,
            useClass: DefaultCiphersFactoryPresenter
        }
    ]
})
export class CiphersFactoryPresenterModule { }
