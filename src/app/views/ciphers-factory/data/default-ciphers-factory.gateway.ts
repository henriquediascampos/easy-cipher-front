import { Observable } from 'rxjs';
import { Cipher } from '../domain/models/Cipher';
import { CiphersFactoryRepository } from './ciphers-factory.repository';
import { Injectable } from '@angular/core';
import { CiphersFactoryGateway } from '../domain/boundaries/ciphers-factory.gateway';

@Injectable()
export class DefaultCiphersFactoryGateway implements CiphersFactoryGateway {
    constructor(private repository: CiphersFactoryRepository) { }

    save(music: Cipher): Observable<Cipher> {
        return this.repository.save(music);
    }
    update(music: Cipher): Observable<Cipher> {
        return this.repository.update(music);
    }
    delete(id: string): Observable<any> {
        return this.repository.delete(id);
    }
    findById(id: string): Observable<Cipher> {
        return this.repository.findById(id);
    }
    findByAll(parameters: {}): Observable<Cipher[]> {
        return this.repository.findByAll(parameters);
    }
}
