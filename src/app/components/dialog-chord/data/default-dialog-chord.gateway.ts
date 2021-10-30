import { DialogChordRepository } from './dialog-chord.repository';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DialogChordGateway } from '../domain/boudaries/dialog-chord.gateway';
import { Chord } from '../domain/models/Chord';

@Injectable()
export class DefaultDialogChordGateway implements DialogChordGateway {
    constructor(private repository: DialogChordRepository) { }


    save(chord: Chord): Observable<Chord> {
        return this.repository.save(chord);
    }
}
