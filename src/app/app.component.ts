import { SpinnerService } from './core/services/spinner.service';
import { AuthService } from './core/services/auth.service';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.sass']
})
export class AppComponent {
    title = 'Easy cipher';
    authenticatedUser = true;
    sub: Subscription;
    lang?: string;
    blur = false;

    constructor(
        private auth: AuthService,
        private translate: TranslateService,
        private spinner: SpinnerService
    ) {
        this.alterlang(navigator.language);

        this.spinner.blurBackgroundNotify.subscribe((onBlur) => {
            this.blur = onBlur;
        });

        this.sub = this.auth.changeAuthenticate.subscribe((auth) => {
            // this.authenticatedUser = !!auth; //decomentar
        });
        this.auth.hasAuthenticated();
    }

    alterlang(lang: string): void {
        this.lang = lang && lang.toLowerCase() === 'pt-br' ? 'pt' : lang;
        this.translate.use(this.lang);
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    logout(): void {
        this.authenticatedUser = false;
        this.auth.logout();
    }
}
