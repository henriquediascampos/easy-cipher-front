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
import { ErrorDialogService } from './../services/error-dilog.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
    constructor(
        private dilogService: ErrorDialogService,
        // private authService: AuthService
    ) {}

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((error) => {
                let handled = false;
                if (error instanceof HttpErrorResponse) {
                    if (error.status === 502) {
                        this.dilogService.openDialog(error);
                    } else if (error.status === 504) {
                        const data: any = error;
                        data.alternativeMessage =
                            'Parece que o servidor não está acessivel, contate o suporte técnico.';
                        this.dilogService.openDialog(data);
                    } else if (error.status === 401) {
                        // this.authService.redirectLogin();
                    } else if (error.status === 404) {
                        const data: any = error;
                        data.alternativeMessage = 'Página não encontrada.';
                        this.dilogService.openDialog(data);
                    } else if (error.status === 400 && req.responseType === 'blob')  {
                        error.error.text().then((text: any) => {
                            this.dilogService.openDialog(JSON.parse(text));
                        });
                    } else {
                        this.dilogService.openDialog(error);
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
