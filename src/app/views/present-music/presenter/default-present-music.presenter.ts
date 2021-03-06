import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PresentMusicPresenter } from '../domain/boundaries/present-music.presenter';
import { CustomCipher } from './../../songbook/domain/models/CustomCipher';
import { PresentMusicService } from './../domain/services/present-music.service';

@Injectable()
export class DefaultPresentMusicPresenter implements PresentMusicPresenter {

    constructor(private service: PresentMusicService) {

    }

    update(music: CustomCipher): Observable<CustomCipher> {
        return this.service.update(music);
    }

    findById(id: string): Observable<CustomCipher> {
        return this.service.findById(id);
    }
}
