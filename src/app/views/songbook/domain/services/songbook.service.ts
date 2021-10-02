import { Cipher } from './../models/Cipher';
import { Songbook } from './../models/Songbook';
import { Observable } from 'rxjs';
import { CustomCipher } from './../models/CustomCipher';
import { Injectable } from '@angular/core';
import { SongbookGateway } from '../boundaries/songbook.gateway';

@Injectable()
export class SongbookService {
    constructor(private gateway: SongbookGateway) { }

    add(cipher: CustomCipher): Observable<CustomCipher> {
        return this.gateway.add(cipher);
    }
    remove(cipher: CustomCipher): Observable<CustomCipher> {
        return this.gateway.remove(cipher);
    }
    delete(id: string): Observable<any> {
        return this.gateway.delete(id);
    }
    findById(id: string): Observable<Songbook> {
        return this.gateway.findById(id);
    }
    findAll(): Observable<Songbook[]> {
        return this.gateway.findAll();
    }
    save(songbook: Songbook): Observable<Songbook> {
        return this.gateway.save(songbook);
    }

    findAllCiphers(parameters: {}): Observable<Cipher[]> {
        return this.gateway.findAllCiphers(parameters);
    }
}
