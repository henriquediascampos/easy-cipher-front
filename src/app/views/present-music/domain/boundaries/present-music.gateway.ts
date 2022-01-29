import { CustomCipher } from './../../../songbook/domain/models/CustomCipher';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export abstract class PresentMusicGateway {

    abstract update(music: CustomCipher): Observable<CustomCipher>;

    abstract findById(id: string): Observable<CustomCipher>;

}
