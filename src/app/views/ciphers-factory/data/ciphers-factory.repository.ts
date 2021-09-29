import { Observable } from 'rxjs';
import { Music } from '../domain/models/Music';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CiphersFactoryRepository {
    constructor(private http: HttpClient) { }

    save(music: Music): Observable<Music> {
        return this.http.post<Music>(`/api/cipher`, music);
    }
    update(music: Music): Observable<Music> {
        return this.http.put<Music>(`/api/cipher`, music);
    }
    delete(music: Music): Observable<any> {
        return this.http.delete(`/api/cipher`, {
            body: music
        });
    }
    findById(id: string): Observable<Music> {
        return this.http.get<Music>(`/api/cipher/${id}`);
    }
    findByAll(parameters: {}): Observable<any[]> {
        return this.http.get<any[]>(`/api/cipher`, {
            params: parameters
        });
    }
}
