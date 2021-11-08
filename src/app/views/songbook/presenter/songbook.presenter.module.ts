import { MatChipsModule } from '@angular/material/chips';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CipherTranslateModule } from './../../../translate/cipher-translate.module';
import { CoreModule } from 'src/app/core/core.module';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { ContainerModule } from '../../../components/container/container.module';
import { MusicCardModule } from '../../../components/music-card/music-card.module';
import { SongbookPresenter } from '../domain/boundaries/songbook.presenter';
import { AssembleSongbookComponent } from './assemble-songbook/assemble-songbook.component';
import { DefaultSongbookPresenter } from './default-songbook-presenter';
import { SongbookRoutingModule } from './songbook.routing';
import { SongbookComponent } from './songbook/songbook.component';
import { DialogAddCipherComponent } from './dialog-add-cipher/dialog-add-cipher.component';


@NgModule({
    declarations: [
        SongbookComponent,
        AssembleSongbookComponent,
        DialogAddCipherComponent
    ],
    imports: [
        CommonModule,
        TranslateModule,
        SongbookRoutingModule,
        ContainerModule,
        MatExpansionModule,
        MatButtonModule,
        MatIconModule,
        MusicCardModule,
        MatInputModule,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
        MatTooltipModule,
        MatAutocompleteModule,
        MatDividerModule,
        CipherTranslateModule,
        MatToolbarModule,
        MatChipsModule
    ],
    providers: [
        {
            provide: SongbookPresenter,
            useClass: DefaultSongbookPresenter
        }
    ]
})
export class SongbookPresenterModule { }
