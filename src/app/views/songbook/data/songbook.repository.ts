import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cipher } from '../domain/models/Cipher';
import { CustomCipher } from './../domain/models/CustomCipher';
import { Songbook } from './../domain/models/Songbook';

@Injectable()
export class SongBookRepository {
    baseUre = environment.apiUrl;


    constructor(private http: HttpClient) { }

    add(cipher: CustomCipher): Observable<CustomCipher> {
        return this.http.post<CustomCipher>(`${this.baseUre}/api/custom-cipher`, cipher);
    }

    remove(cipher: any): Observable<CustomCipher> {
        return this.http.delete(`${this.baseUre}/api/custom-cipher`, {
            params: cipher
        }) as any;
    }


    delete(id: string): Observable<any> {
        return this.http.request('DELETE', `${this.baseUre}/api/songbook`, {
            body: id
        });
    }
    findById(id: string): Observable<Songbook> {
        return this.http.get<Songbook>(`${this.baseUre}/api/songbook/${id}`);
    }

    findAll(): Observable<Songbook[]> {
        return this.http.get<Songbook[]>(`${this.baseUre}/api/songbook/resume-list`);
    }

    save(songbook: Songbook): Observable<Songbook> {
        return this.http.post<Songbook>(`${this.baseUre}/api/songbook`, songbook);
    }

    findAllCiphers(parameters: {}): Observable<Cipher[]> {
        return this.http.get<Cipher[]>(`${this.baseUre}/api/cipher`, {
            params: parameters
        });
    }
}
