import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cipher } from '../domain/models/Cipher';
import { CustomCipher } from './../domain/models/CustomCipher';
import { Songbook } from './../domain/models/Songbook';

@Injectable()
export class SongBookRepository {
    constructor(private http: HttpClient) { }

    add(cipher: CustomCipher): Observable<CustomCipher> {
        return this.http.post<CustomCipher>(`/api/custom-cipher`, cipher);
    }

    remove(cipher: any): Observable<CustomCipher> {
        return this.http.delete(`/api/custom-cipher`, {
            params: cipher
        }) as any;
    }
    delete(id: string): Observable<any> {
        return this.http.delete(`/api/custom-cipher`, {
            params: {id}
        });
    }


    findById(id: string): Observable<Songbook> {
        return this.http.get<Songbook>(`/api/songbook/${id}`);
    }

    findAll(): Observable<Songbook[]> {
        return this.http.get<Songbook[]>(`/api/songbook`);
    }

    save(songbook: Songbook): Observable<Songbook> {
        return this.http.post<Songbook>(`/api/songbook`, songbook);
    }

    findAllCiphers(parameters: {}): Observable<Cipher[]> {
        return this.http.get<Cipher[]>(`/api/cipher`, {
            params: parameters
        });
    }
}
