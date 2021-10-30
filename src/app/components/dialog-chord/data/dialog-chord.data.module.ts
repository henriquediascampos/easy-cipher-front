import { DialogChordRepository } from './dialog-chord.repository';
import { DefaultDialogChordGateway } from './default-dialog-chord.gateway';
import { NgModule } from '@angular/core';
import { DialogChordGateway } from '../domain/boudaries/dialog-chord.gateway';


@NgModule({
    providers: [
        DialogChordRepository,
        {
            provide: DialogChordGateway,
            useClass: DefaultDialogChordGateway
        }
    ],
})
export class DialogChordDataModule { }
