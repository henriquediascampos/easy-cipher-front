import { Cipher } from './../domain/models/Cipher';
import { SongBookRepository } from './songbook.repository';
import { Injectable } from '@angular/core';
import { SongbookGateway } from '../domain/boundaries/songbook.gateway';
import { Observable } from 'rxjs';
import { CustomCipher } from '../domain/models/CustomCipher';
import { Songbook } from '../domain/models/Songbook';

@Injectable()
export class DefaultSongBookGateway implements SongbookGateway {
    constructor(private repository: SongBookRepository) { }

    add(cipher: CustomCipher): Observable<CustomCipher> {
        return this.repository.add(cipher);
    }
    remove(id: string): Observable<CustomCipher> {
        return this.repository.remove(id);
    }

    delete(id: string): Observable<any> {
        return this.repository.delete(id);
    }
    findById(id: string): Observable<Songbook> {
        return this.repository.findById(id);
    }
    findAll(): Observable<Songbook[]> {
        return this.repository.findAll();
    }
    save(songbook: Songbook): Observable<Songbook> {
        return this.repository.save(songbook);
    }

    findAllCiphers(parameters: {}): Observable<Cipher[]> {
        return this.repository.findAllCiphers(parameters);
    }
}
