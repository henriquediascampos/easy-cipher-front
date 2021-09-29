import { FormatMusicService } from './services/format-musica.service';

import { MusicalScaleService } from './services/musical-scale.service';
import { SpinnerService } from './services/spinner.service';
import { RoutesGuard } from './guards/routes.guard';
import { AuthService } from './services/auth.service';
import { Translate } from './services/Http-loader-factory.service';
import { NgModule } from '@angular/core';
import CipherTranslateService from './services/cipher-translate.service';


@NgModule({
    providers: [
        Translate,
        AuthService,
        RoutesGuard,
        SpinnerService,
        CipherTranslateService,
        MusicalScaleService,
        FormatMusicService
    ],
})
export class CoreModule { }
