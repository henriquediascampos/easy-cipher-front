import { NgModule } from '@angular/core';
import { CipherDictionaryGateway } from '../domain/boundaries/cipher-dictionary.gateway';
import { CipherDictionaryRepository } from './cipher-dictionary.repository';
import { DefaultCipherDictionaryGateway } from './default-cipher-dictionary.gateway';

@NgModule({
    providers: [
        CipherDictionaryRepository,
        {
            provide: CipherDictionaryGateway,
            useClass: DefaultCipherDictionaryGateway
        }
    ],
})
export class CipherDictionaryDataModule { }
