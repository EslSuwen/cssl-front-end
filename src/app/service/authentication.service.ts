import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {throwError} from 'rxjs/internal/observable/throwError';
import {environment} from '../../environments/environment';
import {Teacher} from '../enity/teacher';
import {CookieService} from 'ngx-cookie-service';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
    withCredentials: true
};

@Injectable({providedIn: 'root'})
export class AuthenticationService {
    private tokenParsed: any;
    private teacher: Teacher;

    constructor(private http: HttpClient, private cookieService: CookieService) {
    }

    login(no: string, pass: string, img: string): Observable<boolean> {
        return this.http.post<any>(`${environment.apiUrl}/auth/login`, JSON.stringify({
            userNo: no,
            password: pass,
            imgCode: img
        }), httpOptions).pipe(
            tap(response => {
                if (response.success) {
                    // login successful, store username and jwt token in local storage to keep user logged in between page refreshes
                    const teacher: Teacher = response.data.teacher;
                    console.log(response);
                    console.log(teacher);
                    const cookie = this.cookieService.get('satoken');
                    localStorage.setItem('satoken', cookie);
                    localStorage.setItem('currentUser', JSON.stringify(teacher));
                    console.log(localStorage.getItem('currentUserInfo'));
                    console.log(localStorage.getItem('currentUser'));
                    console.log(localStorage.getItem('satoken'));
                    return of(true);
                } else {
                    return of(false);
                }
            }),
            catchError((err) => {
                console.error(err);
                return of(false);
            })
        );
    }

    getCurrentUser(): any {
        return this.isLoggedIn() ? JSON.parse(localStorage.getItem('currentUser')) : '';
    }

    getToken(): string {
        return this.cookieService.check('satoken') ? this.cookieService.get('satoken') : '';
    }

    getUserNo(): string {
        const currentUser = this.getCurrentUser();
        return currentUser ? currentUser.tid : '';
    }

    getUserName(): string {
        const currentUser = this.getCurrentUser();
        return currentUser ? currentUser.tname : '';
    }

    logout(): void {
        localStorage.removeItem('currentUser');
    }

    isLoggedIn(): boolean {
        const token: string = this.getToken();
        return token && token.length > 0;
    }

    hasRole(role: string): boolean {
        return true;
        const currentUser = this.getCurrentUser();
        if (!currentUser) {
            return false;
        }
        const authority: string = currentUser.authority;
        return authority === 'ROLE_' + role;
    }

    getAuthorities(tokenParsed: string): string[] {
        return JSON.parse(tokenParsed).authorities;
    }
}
