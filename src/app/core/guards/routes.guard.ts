import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    RouterStateSnapshot,
    UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class RoutesGuard implements CanActivate {
    constructor(private authService: AuthService) {}

    freeRoutes = ['/auth/login', '/auth/recover-password', '/auth/user-registration'];

    canActivate(
        routeSnapshot: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        if (!this.authService.getAccessToken() && !this.freeRoutes.some(fr => fr === state.url)) {
            // this.authService.redirectLogin(); //decomentar
            // return false; //decomentar
            return true;
        } else {
            return true;
        }
    }
}
