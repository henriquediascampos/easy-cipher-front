import { CiphersFactoryService } from './../domain/services/ciphers-factory.service';
import { Injectable } from '@angular/core';
import { CiphersFactoryPresenter } from '../domain/boudaries/ciphers-factory.presenter';
import { Observable } from 'rxjs';
import { Music } from '../domain/models/Music';

@Injectable()
export class DefaultCiphersFactoryPresenter implements CiphersFactoryPresenter {
    constructor(private service: CiphersFactoryService) { }

    save(music: Music): Observable<Music> {
        return this.service.save(music);
    }
    update(music: Music): Observable<Music> {
        return this.service.update(music);
    }
    delete(music: Music): Observable<any> {
        return this.service.delete(music);
    }
    findById(id: string): Observable<Music> {
        return this.service.findById(id);
    }
    findByAll(parameters: {}): Observable<Music[]> {
        return this.service.findByAll(parameters);
    }
}
