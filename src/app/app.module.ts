import { SpinnerService } from './core/services/spinner.service';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { MenuModule } from './components/menu/menu.module';
import { SpinnerModule } from './components/spinner/spinner.module';
import { CoreModule } from './core/core.module';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
    return new TranslateHttpLoader(http, './assets/locale/', '.json');
}

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatMenuModule,
        FormsModule,
        MatIconModule,
        MatToolbarModule,
        MatButtonModule,
        MenuModule,
        MatDividerModule,
        SpinnerModule,
        MatNativeDateModule,
        CoreModule,
        AppRoutingModule,
        TranslateModule.forRoot({
            defaultLanguage: 'pt',
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient],
            },
        }),
    ],
    providers: [
        { provide: APP_BASE_HREF, useValue: '/easy-cipher' },
        { provide: MAT_DATE_LOCALE, useValue: 'pt' },
        SpinnerService
    ],
    declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
