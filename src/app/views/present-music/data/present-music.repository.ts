import { environment } from './../../../../environments/environment';
import { CustomCipher } from './../../songbook/domain/models/CustomCipher';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class PresentMusicRepository {
    baseUre = environment.apiUrl;

    constructor(private http: HttpClient) {}

    update(music: CustomCipher): Observable<CustomCipher> {
        return this.http.put<CustomCipher>(`${this.baseUre}/api/custom-cipher`, music);
    }

    findById(id: string): Observable<CustomCipher> {
        return this.http.get<CustomCipher>(`${this.baseUre}/api/custom-cipher/${id}`);
    }

}
