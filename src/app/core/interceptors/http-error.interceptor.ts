import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SystemDialogService } from '../services/system-dilog.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
    constructor(
        private dilogService: SystemDialogService,
        // private authService: AuthService
    ) { }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((error) => {
                let handled = false;
                if (error instanceof HttpErrorResponse) {
                    if (error.status === 502) {
                        this.dilogService.error({ message: error.error.message });
                    } else if (error.status === 504 || error.status === 0) {
                        this.dilogService.error({ message: 'Parece que o servidor não está acessivel, contate o suporte técnico.' });
                    } else if (error.status === 401) {
                        // this.authService.redirectLogin();
                    } else if (error.status === 404) {
                        this.dilogService.error({ message: 'Página não encontrada.' });
                    } else if (error.status === 400 && req.responseType === 'blob') {
                        error.error.text().then((text: any) => {
                            const errorExtracted = JSON.parse(text)
                            this.dilogService.error(errorExtracted.error.message);
                        });
                    } else {
                        this.dilogService.error({ message: error.error.message });
                    }
                    handled = true;
                }

                if (handled) {
                    return of(error);
                } else {
                    return throwError(error);
                }
            })
        );
    }
}
