import { CustomCipher } from './../../../songbook/domain/models/CustomCipher';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export abstract class PresentMusicPresenter {

    abstract update(music: CustomCipher): Observable<CustomCipher>;

}
