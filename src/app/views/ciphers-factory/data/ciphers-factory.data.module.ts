import { CiphersFactoryRepository } from './ciphers-factory.repository';
import { DefaultCiphersFactoryGateway } from './default-ciphers-factory.gateway';
import { NgModule } from '@angular/core';
import { CiphersFactoryGateway } from '../domain/boundaries/ciphers-factory.gateway';

@NgModule({
    providers: [
        CiphersFactoryRepository,
        {
            provide: CiphersFactoryGateway,
            useClass: DefaultCiphersFactoryGateway
        }
    ],
})
export class CiphersFactoryDataModule { }
