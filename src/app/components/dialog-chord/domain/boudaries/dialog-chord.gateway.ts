import { Observable } from 'rxjs';
import { Chord } from './../models/Chord';
import { Injectable } from '@angular/core';

@Injectable()
export abstract class DialogChordGateway {

    abstract save(chord: Chord): Observable<Chord>;

}
