import { Observable } from 'rxjs';
import { Cipher } from '../models/Cipher';
import { Injectable } from '@angular/core';

@Injectable()
export abstract class CiphersFactoryPresenter {

    abstract save(music: Cipher): Observable<Cipher>;
    abstract update(music: Cipher): Observable<Cipher>;
    abstract delete(music: Cipher): Observable<any>;
    abstract findById(id: string): Observable<Cipher>;
    abstract findByAll(parameters: {}): Observable<Cipher[]>;
}
