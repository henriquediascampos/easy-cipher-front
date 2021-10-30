import { Observable } from 'rxjs';
import { Chord } from './../models/Chord';
import { Injectable } from '@angular/core';

@Injectable()
export abstract class DialogChordPresenter {
    abstract save(chord: Chord): Observable<Chord>;

}
