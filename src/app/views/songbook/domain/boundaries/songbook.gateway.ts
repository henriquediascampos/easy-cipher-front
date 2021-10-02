import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cipher } from './../models/Cipher';
import { CustomCipher } from './../models/CustomCipher';
import { Songbook } from './../models/Songbook';

@Injectable()
export abstract class SongbookGateway {

    abstract add(cipher: CustomCipher): Observable<CustomCipher>;
    abstract remove(cipher: CustomCipher): Observable<CustomCipher>;
    abstract delete(id: string): Observable<any>;
    abstract findById(id: string): Observable<Songbook>;
    abstract findAll(): Observable<Songbook[]>;
    abstract save(songbook: Songbook): Observable<Songbook>;
    abstract findAllCiphers(parameters: {}): Observable<Cipher[]>;
}
