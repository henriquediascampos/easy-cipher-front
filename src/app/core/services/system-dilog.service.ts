import { DialogData } from './../../views/songbook/presenter/dialog-add-cipher/dialog-add-cipher.component';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SystemDialogComponent, TypeDialog } from '../../components/system-dialog/presenter/system-dialog/system-dialog.component';

export interface Data {
    message: string;
    callback?: (value?: any) => void
}

@Injectable()
export class SystemDialogService {

    constructor(public dialog: MatDialog) { }

    error(data: Data): void {
        this.showSystemDialog(data, 'error');
    }

    sucess(data: Data): void {
        this.showSystemDialog(data, 'sucess')
    }

    warn(data: Data): void {
        this.showSystemDialog(data, 'warn')
    }

    info(data: Data): void {
        this.showSystemDialog(data, 'info')
    }

    private showSystemDialog(data: Data, type: TypeDialog) {
        this.dialog.open(SystemDialogComponent, {
            height: '250px',
            width: '520px',
            data: {
                type,
                message: data.message,
                callback: data.callback,
            }
        });
    }
}
