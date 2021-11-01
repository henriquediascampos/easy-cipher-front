import { CustomCipher } from './../../../songbook/domain/models/CustomCipher';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { PresentMusicGateway } from '../boundaries/present-music.gateway';

@Injectable()
export class PresentMusicService {

    constructor(private gateway: PresentMusicGateway) {}

    update(music: CustomCipher): Observable<CustomCipher> {
        return this.gateway.update(music);
    }

}
