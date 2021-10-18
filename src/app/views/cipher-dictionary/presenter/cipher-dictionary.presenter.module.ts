import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { CoreModule } from 'src/app/core/core.module';
import { CipherDictionaryPresenter } from '../domain/boundaries/cipher-dictionary.presenter';
import { ContainerModule } from './../../../components/container/container.module';
import { GuitarArmModule } from './../../../components/guitar-arm/guitar-arm.module';
import { CipherDictionaryRouting } from './cipher-dictionary.routing';
import { CipherDictionaryComponent } from './cipher-dictionary/cipher-dictionary.component';
import { DefaultCipherDictionaryPresenter } from './default-cipher-dictionary.presenter';


@NgModule({
    declarations: [
        CipherDictionaryComponent
    ],
    imports: [
        CommonModule,
        CipherDictionaryRouting,
        CoreModule,
        ContainerModule,
        GuitarArmModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        TranslateModule,
        CoreModule
    ],
    providers: [
        {
            provide: CipherDictionaryPresenter,
            useClass: DefaultCipherDictionaryPresenter
        }
    ],
})
export class CipherDictionaryPresenterModule { }
