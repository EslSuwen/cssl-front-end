import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {throwError} from 'rxjs/internal/observable/throwError';
import {environment} from '../../environments/environment';
import {Teacher} from '../enity/teacher';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
    withCredentials: true
};

@Injectable({providedIn: 'root'})
export class AuthenticationService {
    private tokenParsed: any;
    private teacher: Teacher;

    constructor(private http: HttpClient) {
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
                    localStorage.setItem('currentUserInfo', JSON.stringify(teacher));
                    localStorage.setItem('currentUser', JSON.stringify({
                        userNo: no,
                        token: response.data.token,
                    }));
                    console.log(localStorage.getItem('currentUserInfo'));
                    console.log(localStorage.getItem('currentUser'));
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
        const userStr = localStorage.getItem('currentUser');
        // const nowTime = new Date().getTime().toString().substr(0, 10);
        // const user = JSON.parse(userStr);
        // return userStr && user.expire > nowTime ? user : this.logout();
        return JSON.parse(userStr);
    }

    getCurrentUserInfo(): any {
        const userInfoStr = localStorage.getItem('currentUserInfo');
        return this.isLoggedIn() ? JSON.parse(userInfoStr) : '';
    }

    getToken(): string {
        const currentUser = this.getCurrentUser();
        return currentUser ? currentUser.token : '';
    }

    getUserNo(): string {
        const currentUser = this.getCurrentUser();
        return currentUser ? currentUser.userNo : '';
    }

    getUserName(): string {
        const currentUser = this.getCurrentUserInfo();
        console.log(currentUser);
        console.log(currentUser.tname);
        return currentUser ? currentUser.tname : '';
    }

    logout(): void {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('currentUserInfo');
    }

    isLoggedIn(): boolean {
        const token: string = this.getToken();
        return token && token.length > 0;
    }

    hasRole(role: string): boolean {
        return true;
        const currentUser = this.getCurrentUserInfo();
        if (!currentUser) {
            return false;
        }
        const authority: string = currentUser.authority;
        return authority === 'ROLE_' + role;
    }

    decodeToken(token: string): string {
        let payload: string = token.split('.')[1];

        payload = payload.replace('/-/g', '+').replace('/_/g', '/');
        switch (payload.length % 4) {
            case 0:
                break;
            case 2:
                payload += '==';
                break;
            case 3:
                payload += '=';
                break;
            default:
                throwError('Invalid token');
        }

        payload = (payload + '===').slice(0, payload.length + (payload.length % 4));

        return decodeURIComponent(escape(atob(payload)));
    }

    getAuthorities(tokenParsed: string): string[] {
        return JSON.parse(tokenParsed).authorities;
    }
}
