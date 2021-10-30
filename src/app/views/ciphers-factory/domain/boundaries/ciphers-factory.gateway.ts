import { Chord } from './../../../../components/dialog-chord/domain/models/Chord';
import { Cipher } from '../models/Cipher';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export abstract class CiphersFactoryGateway {

    abstract save(music: Cipher): Observable<Cipher>;
    abstract update(music: Cipher): Observable<Cipher>;
    abstract delete(id: string): Observable<any>;
    abstract findById(id: string): Observable<Cipher>;
    abstract findByAll(parameters: {}): Observable<Cipher[]>;

    abstract loadChords(): Observable<Chord[]>;

}
