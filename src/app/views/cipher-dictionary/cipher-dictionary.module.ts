import { NgModule } from '@angular/core';
import { CipherDictionaryDataModule } from './data/cipher-dictionary.data.module';
import { CipherDictionaryDomainModule } from './domain/cipher.dictionary.domain.module';
import { CipherDictionaryPresenterModule } from './presenter/cipher-dictionary.presenter.module';

@NgModule({
  imports: [
    CipherDictionaryPresenterModule,
    CipherDictionaryDomainModule,
    CipherDictionaryDataModule
  ]
})
export class CipherDictionaryModule { }
