import { Observable } from 'rxjs';
import { Cipher } from '../models/Cipher';
import { Injectable } from '@angular/core';
import { CiphersFactoryGateway } from '../boundaries/ciphers-factory.gateway';

@Injectable()
export class CiphersFactoryService {
    constructor(private gateway: CiphersFactoryGateway) { }

    save(music: Cipher): Observable<Cipher> {
        return this.gateway.save(music);
    }
    update(music: Cipher): Observable<Cipher> {
        return this.gateway.update(music);
    }
    delete(music: Cipher): Observable<any> {
        return this.gateway.delete(music);
    }
    findById(id: string): Observable<Cipher> {
        return this.gateway.findById(id);
    }
    findByAll(parameters: {}): Observable<Cipher[]> {
        return this.gateway.findByAll(parameters);
    }
}
