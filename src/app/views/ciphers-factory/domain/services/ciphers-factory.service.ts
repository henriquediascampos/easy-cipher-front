import { Observable } from 'rxjs';
import { Music } from './../models/Music';
import { Injectable } from '@angular/core';
import { CiphersFactoryGateway } from '../boundaries/ciphers-factory.gateway';

@Injectable()
export class CiphersFactoryService {
    constructor(private gateway: CiphersFactoryGateway) { }

    save(music: Music): Observable<Music> {
        return this.gateway.save(music);
    }
    update(music: Music): Observable<Music> {
        return this.gateway.update(music);
    }
    delete(music: Music): Observable<any> {
        return this.gateway.delete(music);
    }
    findById(id: string): Observable<Music> {
        return this.gateway.findById(id);
    }
    findByAll(parameters: {}): Observable<Music[]> {
        return this.gateway.findByAll(parameters);
    }
}
