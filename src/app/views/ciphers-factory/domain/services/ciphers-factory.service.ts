import { Chord } from './../../../../components/dialog-chord/domain/models/Chord';
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
    delete(id: string): Observable<any> {
        return this.gateway.delete(id);
    }
    findById(id: string): Observable<Cipher> {
        return this.gateway.findById(id);
    }
    findByAll(parameters: {}): Observable<Cipher[]> {
        return this.gateway.findByAll(parameters);
    }

    loadChords(): Observable<Chord[]> {
        return this.gateway.loadChords();
    }

}
