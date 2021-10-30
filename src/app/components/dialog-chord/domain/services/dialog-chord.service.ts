import { Observable } from 'rxjs';
import { Chord } from './../../../../views/cipher-dictionary/domain/models/Chord';
import { Injectable } from '@angular/core';
import { DialogChordGateway } from '../boudaries/dialog-chord.gateway';

@Injectable()
export class DialogChordService {
    constructor(private gateway: DialogChordGateway) { }

    save(chord: Chord): Observable<Chord> {
        return this.gateway.save(chord);
    }

}
