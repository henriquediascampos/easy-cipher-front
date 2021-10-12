import { environment } from './../../../../environments/environment';
import { Observable } from 'rxjs';
import { Cipher } from '../domain/models/Cipher';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CiphersFactoryRepository {

    baseUre = environment.apiUrl;

    constructor(private http: HttpClient) { }

    save(music: Cipher): Observable<Cipher> {
        return this.http.post<Cipher>(`${this.baseUre}/api/cipher`, music);
    }
    update(music: Cipher): Observable<Cipher> {
        return this.http.put<Cipher>(`${this.baseUre}/api/cipher`, music);
    }
    delete(id: string): Observable<any> {
        return this.http.delete(`/ap${this.baseUre}i/cipher`, {
            body: id
        });
    }
    findById(id: string): Observable<Cipher> {
        return this.http.get<Cipher>(`${this.baseUre}/api/cipher/${id}`);
    }
    findByAll(parameters: {}): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUre}/api/cipher`, {
            params: parameters
        });
    }
}
