import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SongbookPresenter } from '../domain/boundaries/songbook.presenter';
import { Cipher } from './../domain/models/Cipher';
import { CustomCipher } from './../domain/models/CustomCipher';
import { Songbook } from './../domain/models/Songbook';
import { SongbookService } from './../domain/services/songbook.service';

@Injectable()
export class DefaultSongbookPresenter implements SongbookPresenter {
    constructor(private service: SongbookService) { }

    add(cipher: CustomCipher): Observable<CustomCipher> {
        return this.service.add(cipher);
    }
    remove(cipher: CustomCipher): Observable<CustomCipher> {
        return this.service.remove(cipher);
    }
    delete(id: string): Observable<any> {
        return this.service.delete(id);
    }
    findById(id: string): Observable<Songbook> {
        return this.service.findById(id);
    }
    findAll(): Observable<Songbook[]> {
        return this.service.findAll();
    }
    save(songbook: Songbook): Observable<Songbook> {
        return this.service.save(songbook);
    }

    findAllCiphers(parameters: {}): Observable<Cipher[]> {
        return this.service.findAllCiphers(parameters);
    }
}
