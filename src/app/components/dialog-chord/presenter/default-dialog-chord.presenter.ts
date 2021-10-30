import { DialogChordService } from './../domain/services/dialog-chord.service';
import { Injectable } from '@angular/core';
import { DialogChordPresenter } from '../domain/boudaries/dialog-chord.presenter';
import { Observable } from 'rxjs';
import { Chord } from '../domain/models/Chord';

@Injectable()
export class DefaultDialogChordPresenter implements DialogChordPresenter {
    constructor(private service: DialogChordService) { }

    save(chord: Chord): Observable<Chord> {
        return this.service.save(chord);
    }
}
