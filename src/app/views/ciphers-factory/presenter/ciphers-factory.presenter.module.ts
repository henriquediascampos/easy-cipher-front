import { RequestFilterService } from './cipher-list/request-filter.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { CoreModule } from 'src/app/core/core.module';
import { CiphersFactoryPresenter } from '../domain/boundaries/ciphers-factory.presenter';
import { ContainerModule } from './../../../components/container/container.module';
import { DialogChordModule } from './../../../components/dialog-chord/dialog-chord.module';
import { MusicCardModule } from './../../../components/music-card/music-card.module';
import { SystemDialogModule } from './../../../components/system-dialog/system-dialog.module';
import { CipherTranslateModule } from './../../../translate/cipher-translate.module';
import { CipherListComponent } from './cipher-list/cipher-list.component';
import { CiphersFactoryFirstTabComponent } from './ciphers-factory-first-tab/ciphers-factory-first-tab.component';
import { CiphersFactorySecondaryTabComponent } from './ciphers-factory-secondary-tab/ciphers-factory-secondary-tab.component';
import { CiphersFactoryRouting } from './ciphers-factory.routing';
import { CiphersFactoryComponent } from './ciphers-factory/ciphers-factory.component';
import { DefaultCiphersFactoryPresenter } from './default-ciphers-factory.presenter';
import { DialogSetNoteComponent } from './dialog-set-note/dialog-set-note.component';

@NgModule({
    declarations: [
        CiphersFactoryComponent,
        DialogSetNoteComponent,
        CiphersFactoryFirstTabComponent,
        CiphersFactorySecondaryTabComponent,
        CipherListComponent,
    ],
    imports: [
        CommonModule,
        CiphersFactoryRouting,
        TranslateModule,
        CipherTranslateModule,
        MatToolbarModule,
        MatTabsModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatButtonModule,
        MatIconModule,
        MatAutocompleteModule,
        MatInputModule,
        MatOptionModule,
        CoreModule,
        ContainerModule,
        MatCardModule,
        MusicCardModule,
        MatChipsModule,
        MatTooltipModule,
        SystemDialogModule,
        DialogChordModule,
    ],
    providers: [
        {
            provide: CiphersFactoryPresenter,
            useClass: DefaultCiphersFactoryPresenter,
        },
        RequestFilterService,
    ],
})
export class CiphersFactoryPresenterModule {}
