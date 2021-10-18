import { CipherDictionaryRepository } from './cipher-dictionary.repository';
import { Injectable } from '@angular/core';
import { CipherDictionaryGateway } from '../domain/boundaries/cipher-dictionary.gateway';
import { Observable } from 'rxjs';
import { Chord } from '../domain/models/Chord';

@Injectable()
export class DefaultCipherDictionaryGateway implements CipherDictionaryGateway {
    constructor(private repository: CipherDictionaryRepository) { }

    save(chord: Chord): Observable<Chord> {
        return this.repository.save(chord);
    }
    update(music: Chord): Observable<Chord> {
        return this.repository.update(music);
    }
    delete(id: string): Observable<any> {
        return this.repository.delete(id);
    }
    findById(id: string): Observable<Chord> {
        return this.repository.findById(id);
    }
    findByAll(parameters: {}): Observable<Chord[]> {
        return this.repository.findByAll(parameters);
    }
}
