import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../../../../environments/environment';
import { Chord } from './../domain/models/Chord';


@Injectable()
export class CipherDictionaryRepository {
    constructor(private http: HttpClient) {}
    baseUre = environment.apiUrl;

    save(chord: Chord): Observable<Chord> {
        return this.http.post<Chord>(
            `${this.baseUre}/api/chord`,
            chord
        );
    }
    update(chord: Chord): Observable<Chord> {
        return this.http.put<Chord>(
            `${this.baseUre}/api/chord`,
            chord
        );
    }
    delete(id: string): Observable<any> {
        return this.http.delete(`${this.baseUre}/api/chord`, {
            body: id,
        });
    }
    findById(id: string): Observable<Chord> {
        return this.http.get<Chord>(
            `${this.baseUre}/api/chord/${id}`
        );
    }
    findByAll(parameters: {}): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUre}/api/chord`, {
            params: parameters,
        });
    }
}
