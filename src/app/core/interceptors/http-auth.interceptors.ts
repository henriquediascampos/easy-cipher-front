import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.authService.getAccessToken();

        if (!token) {
            // this.authService.redirectLogin(); //descomentar
        }

        if (req.url.includes('/api') && token) {
            const cloned = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + this.authService.getAccessToken())
            });
            return next.handle(cloned);
        } else {
            return next.handle(req);
        }
    }
}

