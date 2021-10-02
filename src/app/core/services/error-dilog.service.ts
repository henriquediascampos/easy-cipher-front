import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SystemDialogComponent } from './../../components/system-dialog/presenter/system-dialog/system-dialog.component';

@Injectable()
export class ErrorDialogService {

    constructor(public dialog: MatDialog) { }

    openDialog(error: any): void {
        this.dialog.open(SystemDialogComponent, {
            height: '250px',
            width: '520px',
            data: {
                mensage: error.error.message,
                type: 'error'
            }
        });
    }
}
