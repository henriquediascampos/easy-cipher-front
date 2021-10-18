import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GuitarArmModule } from './../../../components/guitar-arm/guitar-arm.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { ContainerModule } from './../../../components/container/container.module';
import { CipherDictionaryRouting } from './cipher-dictionary.routing';
import { CipherDictionaryComponent } from './cipher-dictionary/cipher-dictionary.component';


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
        TranslateModule
    ]
})
export class CipherDictionaryPresenterModule { }
