import { NgModule } from '@angular/core';
import { CiphersFactoryDataModule } from './data/ciphers-factory.data.module';
import { CiphersFactoryDomainModule } from './domain/ciphers-factory.domain.module';
import { CiphersFactoryPresenterModule } from './presenter/ciphers-factory.presenter.module';



@NgModule({
    imports: [
        CiphersFactoryPresenterModule,
        CiphersFactoryDomainModule,
        CiphersFactoryDataModule
    ]
})
export class CiphersFactoryModule { }
