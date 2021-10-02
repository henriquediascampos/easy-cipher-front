import { Injectable } from "@angular/core";
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export default class CipherTranslateService {

    constructor(private translate: TranslateService) {}

    change(text: string, variable: (t: string ) => void): void {
        variable(this.translate.instant(text));
        this.translate.onLangChange.subscribe(() => {
            variable(this.translate.instant(text));
        });
    }

}
