import { SpinnerService } from './core/services/spinner.service';
import { AuthService } from './core/services/auth.service';
import { AfterViewInit, Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.sass'],
})
export class AppComponent implements AfterViewInit {
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

        this.sub = this.auth.changeAuthenticate.subscribe((auth) => {
            // this.authenticatedUser = !!auth; //decomentar
        });
        this.auth.hasAuthenticated();

    }

    ngAfterViewInit(): void {
        this.spinner.blurBackgroundNotify.subscribe((onBlur) => {
            this.blur = onBlur;
        });
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
