import { Observable } from 'rxjs';
import { Music } from '../models/Music';
import { Injectable } from '@angular/core';

@Injectable()
export abstract class CiphersFactoryPresenter {

    abstract save(music: Music): Observable<Music>;
    abstract update(music: Music): Observable<Music>;
    abstract delete(music: Music): Observable<any>;
    abstract findById(id: string): Observable<Music>;
    abstract findByAll(parameters: {}): Observable<Music[]>;
}
