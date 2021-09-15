import { Observable } from 'rxjs';
import { Music } from '../domain/models/Music';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CiphersFactoryRepository {
    constructor(private http: HttpClient) { }

    save(music: Music): Observable<Music> {
        return this.http.post<Music>(`easy-cipher/api/ciphers-factory`, music);
    }
    update(music: Music): Observable<Music> {
        return this.http.put<Music>(`easy-cipher/api/ciphers-factory`, music);
    }
    delete(music: Music): Observable<any> {
        return this.http.delete(`easy-cipher/api/ciphers-factory`, {
            body: music
        });
    }
    findById(id: string): Observable<Music> {
        return this.http.get<Music>(`easy-cipher/api/ciphers-factory/${id}`);
    }
    findByAll(parameters: {}): Observable<Music[]> {
        return this.http.get<Music[]>(`easy-cipher/api/ciphers-factory`, {
            params: parameters
        });
    }
}
