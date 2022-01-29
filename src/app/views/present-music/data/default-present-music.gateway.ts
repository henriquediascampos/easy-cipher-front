import { CustomCipher } from './../../songbook/domain/models/CustomCipher';
import { PresentMusicRepository } from './present-music.repository';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { PresentMusicGateway } from '../domain/boundaries/present-music.gateway';

@Injectable()
export class DefaultPresentMusicGateway implements PresentMusicGateway {

    constructor(private repository: PresentMusicRepository) {

    }

    update(music: CustomCipher): Observable<CustomCipher> {
        return this.repository.update(music);
    }

    findById(id: string): Observable<CustomCipher> {
        return this.repository.findById(id);
    }

}
