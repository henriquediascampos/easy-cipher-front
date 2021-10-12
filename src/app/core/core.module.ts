import { FocusService } from './services/focus.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { SystemDialogModule } from './../components/system-dialog/system-dialog.module';
import { RoutesGuard } from './guards/routes.guard';
import { HttpErrorInterceptor } from './interceptors/http-error.interceptor';
import { AuthService } from './services/auth.service';
import { FormatMusicService } from './services/format-musica.service';
import { Translate } from './services/Http-loader-factory.service';
import { MusicalScaleService } from './services/musical-scale.service';
import { SystemDialogService } from './services/system-dilog.service';


@NgModule({
    imports: [MatDialogModule, SystemDialogModule],
    providers: [
        SystemDialogService,
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
        MusicalScaleService,
        FormatMusicService,
        FocusService
    ],
})
export class CoreModule { }
