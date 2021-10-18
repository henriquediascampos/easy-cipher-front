import { Chord } from './../models/Chord';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export abstract class CipherDictionaryGateway {
    abstract save(chord: Chord): Observable<Chord>;
    abstract update(music: Chord): Observable<Chord>;
    abstract delete(id: string): Observable<any>;
    abstract findById(id: string): Observable<Chord>;
    abstract findByAll(parameters: {}): Observable<Chord[]>;
}
