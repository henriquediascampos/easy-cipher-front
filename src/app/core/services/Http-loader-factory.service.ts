import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

@Injectable()
export class Translate {

    constructor() {

    }

    static httpLoaderFactory(http: HttpClient): TranslateHttpLoader {
        return new TranslateHttpLoader(http, './assets/locale/', '.json');
    }
}
