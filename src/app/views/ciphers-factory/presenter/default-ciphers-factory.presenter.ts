import { CiphersFactoryService } from './../domain/services/ciphers-factory.service';
import { Injectable } from '@angular/core';
import { CiphersFactoryPresenter } from '../domain/boundaries/ciphers-factory.presenter';
import { Observable } from 'rxjs';
import { Cipher } from '../domain/models/Cipher';

@Injectable()
export class DefaultCiphersFactoryPresenter implements CiphersFactoryPresenter {
    constructor(private service: CiphersFactoryService) { }

    save(music: Cipher): Observable<Cipher> {
        return this.service.save(music);
    }
    update(music: Cipher): Observable<Cipher> {
        return this.service.update(music);
    }
    delete(music: Cipher): Observable<any> {
        return this.service.delete(music);
    }
    findById(id: string): Observable<Cipher> {
        return this.service.findById(id);
    }
    findByAll(parameters: {}): Observable<Cipher[]> {
        return this.service.findByAll(parameters);
    }
}
