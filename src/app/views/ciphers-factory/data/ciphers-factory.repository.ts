import { Observable } from 'rxjs';
import { Cipher } from '../domain/models/Cipher';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CiphersFactoryRepository {
    constructor(private http: HttpClient) { }

    save(music: Cipher): Observable<Cipher> {
        return this.http.post<Cipher>(`/api/cipher`, music);
    }
    update(music: Cipher): Observable<Cipher> {
        return this.http.put<Cipher>(`/api/cipher`, music);
    }
    delete(music: Cipher): Observable<any> {
        return this.http.delete(`/api/cipher`, {
            body: music
        });
    }
    findById(id: string): Observable<Cipher> {
        return this.http.get<Cipher>(`/api/cipher/${id}`);
    }
    findByAll(parameters: {}): Observable<any[]> {
        return this.http.get<any[]>(`/api/cipher`, {
            params: parameters
        });
    }
}
