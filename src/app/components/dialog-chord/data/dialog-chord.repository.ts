import { environment } from './../../../../environments/environment';
import { Observable } from 'rxjs';
import { Chord } from './../domain/models/Chord';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class DialogChordRepository {
    constructor(private http: HttpClient) {}
    baseUre = environment.apiUrl;

    save(chord: Chord): Observable<Chord> {
        return this.http.post<Chord>(`${this.baseUre}/api/chord`, chord);
    }
}
