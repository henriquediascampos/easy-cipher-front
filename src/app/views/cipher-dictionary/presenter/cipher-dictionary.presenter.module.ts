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
        CipherDictionaryRouting,
        CommonModule,
        CoreModule,
        ContainerModule
    ]
})
export class CipherDictionaryPresenterModule { }
