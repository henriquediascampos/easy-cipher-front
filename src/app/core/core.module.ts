import { SystemDialogModule } from './../components/system-dialog/system-dialog.module';
import { MatDialogModule } from '@angular/material/dialog';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RoutesGuard } from './guards/routes.guard';
import { HttpErrorInterceptor } from './interceptors/http-error.interceptor';
import { AuthService } from './services/auth.service';
import { ErrorDialogService } from './services/error-dilog.service';
import { FormatMusicService } from './services/format-musica.service';
import { Translate } from './services/Http-loader-factory.service';
import { MusicalScaleService } from './services/musical-scale.service';
import { SpinnerService } from './services/spinner.service';


@NgModule({
    imports: [MatDialogModule, SystemDialogModule],
    providers: [
        ErrorDialogService,
        // {
        //     provide: HTTP_INTERCEPTORS,
        //     useClass: AuthInterceptor,
        //     multi: true
        // },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpErrorInterceptor,
            multi: true
        },
        Translate,
        AuthService,
        RoutesGuard,
        SpinnerService,
        MusicalScaleService,
        FormatMusicService,
    ],
})
export class CoreModule { }
