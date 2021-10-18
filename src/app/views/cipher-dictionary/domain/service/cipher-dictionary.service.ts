import { Observable } from 'rxjs';
import { Chord } from './../models/Chord';
import { Injectable } from '@angular/core';
import { CipherDictionaryGateway } from '../boundaries/cipher-dictionary.gateway';

@Injectable()
export class CipherDictionaryService {
    constructor(private gateway: CipherDictionaryGateway) { }

    save(chord: Chord): Observable<Chord> {
        return this.gateway.save(chord);
    }
    update(music: Chord): Observable<Chord> {
        return this.gateway.update(music);
    }
    delete(id: string): Observable<any> {
        return this.gateway.delete(id);
    }
    findById(id: string): Observable<Chord> {
        return this.gateway.findById(id);
    }
    findByAll(parameters: {}): Observable<Chord[]> {
        return this.gateway.findByAll(parameters);
    }
}
