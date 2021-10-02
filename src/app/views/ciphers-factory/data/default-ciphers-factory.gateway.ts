import { Observable } from 'rxjs';
import { Music } from '../domain/models/Music';
import { CiphersFactoryRepository } from './ciphers-factory.repository';
import { Injectable } from '@angular/core';
import { CiphersFactoryGateway } from '../domain/boundaries/ciphers-factory.gateway';

@Injectable()
export class DefaultCiphersFactoryGateway implements CiphersFactoryGateway {
    constructor(private repository: CiphersFactoryRepository) { }

    save(music: Music): Observable<Music> {
        return this.repository.save(music);
    }
    update(music: Music): Observable<Music> {
        return this.repository.update(music);
    }
    delete(music: Music): Observable<any> {
        return this.repository.delete(music);
    }
    findById(id: string): Observable<Music> {
        return this.repository.findById(id);
    }
    findByAll(parameters: {}): Observable<Music[]> {
        return this.repository.findByAll(parameters);
    }
}
