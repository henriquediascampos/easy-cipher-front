import { Observable } from 'rxjs';
import { Chord } from './../domain/models/Chord';
import { CipherDictionaryService } from './../domain/service/cipher-dictionary.service';
import { Injectable } from '@angular/core';
import { CipherDictionaryPresenter } from '../domain/boundaries/cipher-dictionary.presenter';

@Injectable()
export class DefaultCipherDictionaryPresenter implements CipherDictionaryPresenter {
    constructor(private service: CipherDictionaryService) { }

    save(chord: Chord): Observable<Chord> {
        return this.service.save(chord);
    }
    update(music: Chord): Observable<Chord> {
        return this.service.update(music);
    }
    delete(id: string): Observable<any> {
        return this.service.delete(id);
    }
    findById(id: string): Observable<Chord> {
        return this.service.findById(id);
    }
    findByAll(parameters: {}): Observable<Chord[]> {
        return this.service.findByAll(parameters);
    }
}
