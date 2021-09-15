import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { Auth } from '../model/Auth';

@Injectable()
export class AuthService {
    authenticated = new Subject<string | null>();
    changeAuthenticate = this.authenticated.asObservable();

    constructor(private http: HttpClient, private router: Router) {}

    setAccessToken(accessToken: string): void {
        sessionStorage.setItem('access_token', accessToken);
        this.hasAuthenticated();
    }

    getAccessToken(): string | null {
        return sessionStorage.getItem('access_token');
    }

    cleanAccessToken(): void {
        sessionStorage.removeItem('access_token');
    }

    async hasAuthenticated(): Promise<void> {
        const access = this.getAccessToken();
        this.authenticated.next(access);
    }

    login(user: any): Observable<Auth> {
        return this.http.post<Auth>('/api/login', user);
    }

    logout(): void {
        this.cleanAccessToken();
        this.redirectLogin();
        // this.http.get('/api/logout').subscribe((response) => {
        //     this.cleanAccessToken();
        //     this.router.navigate(['auth/login']);
        // });
    }

    redirectLogin(): void {
        this.cleanAccessToken();
        this.router.navigate(['auth/login']);
    }
}
