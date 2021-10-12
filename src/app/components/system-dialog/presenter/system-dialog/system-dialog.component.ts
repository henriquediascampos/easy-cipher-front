import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CipherTranslateService } from 'src/app/translate/cipher-translate.service';

export declare type TypeDialog = 'error' | 'warn' | 'sucess' | 'info'

export interface DialogData {
    type: TypeDialog;
    subtitle?: string;
    message: string;
    callback?: (value?: any) => void
}

@Component({
    selector: 'ec-system-dialog',
    templateUrl: './system-dialog.component.html',
    styleUrls: ['./system-dialog.component.sass']
})
export class SystemDialogComponent implements OnInit {

    title?: string;
    @ViewChild('btnOk') btnOk!: MatButton;

    constructor(
        public dialogRef: MatDialogRef<SystemDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private translate: CipherTranslateService,
    ) {
        this.translate.change("SYSTEM.DIALOG." + this.data.type.toUpperCase(), (t: string) => { this.title = t });
    }

    ngOnInit(): void {
        if (this.data.callback) {
            setTimeout(() => {
                this.btnOk.focus('program')
            }, 250);
        }
    }

    close(): void {
        this.dialogRef.close();
    }

    ok(): void {
        if (this.data.callback) {
            this.data.callback();
        }
        this.close();
    }

    icon(): string {
        switch (this.data.type) {
            case 'error':
                return 'error_outline'
            case 'warn':
                return 'warning_amber'
            case 'sucess':
                return 'done'
            default:
                return 'info';
        }
    }
}
