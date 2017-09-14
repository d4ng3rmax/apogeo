import { Inject, Injectable, Output, EventEmitter } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute, NavigationCancel } from '@angular/router';
import { User } from '../models';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {

    userEmitter: EventEmitter<User> = new EventEmitter<User>();
    authenticated: Boolean = false;
    user: User;
    token: string;
    validated: Boolean = false;
    validating: Boolean = false;

    constructor(private http: Http, private route: ActivatedRoute,
        private router: Router) {
        // Reload token from localStorage
        // this.token = '2819e418-76e1-4a41-bb54-c30509146d19';
        // this.validateToken();
        if (!this.authenticated && localStorage.getItem('user') && localStorage.getItem('token')) {
            console.log('Getting user from storage');
            this.setUser(JSON.parse(localStorage.getItem('user')), localStorage.getItem('token'));
            this.validateToken(this.token);
        }
        // router.events.subscribe(s => {
        //     if (s instanceof NavigationCancel) {
        //         let params = new URLSearchParams(s.url.split('#')[1]);
        //         let access_token = params.get('access_token');
        //         if (access_token == null || access_token === undefined) {
        //             return;
        //         }

                // console.log('[AuthService] URL: ' + s.url);
                // console.log('[AuthService] Token: ' + access_token + ' - Validating...');
                // this.validateToken(access_token);
            // }
        // });
    }

    isAuthenticated() {
        return this.token != null && this.validated;
    }

    setUser(user: User, token: string) {
        this.user = user;
        this.token = token;
        localStorage.setItem('user', JSON.stringify(this.user));
        localStorage.setItem('token', this.token);
        this.userEmitter.emit(this.user);
    }

    logout() {
        // console.log('[AuthService][logout] Called');
        this.token = null;
        this.user = null;
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('returnUrl');
        this.userEmitter.emit();
    }

    validateToken(token: string) {
        if (token == null) {
            console.log('[auth.service][validateToken] No token provided');
            return null;
        }
        if(this.validating) {
            // console.log('Token already being validated.');
            return;
        }
        // console.log('Validating token: ' + token);
        this.validating = true;
        // let url = 'mock.json';
        let url = environment.api.user;
        // let url = 'https://apogeo-app:secret@apogeo-oauth-server.cfapps.io/oauth/check_token?token=' + token;
        // let url = 'https://apogeo-app:secret@apogeo-oauth-server.cfapps.io/oauth/login';
        // let url = 'https://apogeo-app:secret@apogeo-oauth-server.cfapps.io/oauth/login';
        // let headers = new Headers({ 'x-jwt-token': token });
        // let headers = new Headers();
        // var auth = btoa("apogeo-app:secret");
        // let headers = new Headers({ "Authorization": "Basic " + auth });
        this.token = token;
        let options = new RequestOptions({ headers: this.getHeaders() });
        // console.log('Headers: ' + this.getHeaders().get("Authorization") );
        var request = this.http.get(url, options);

        // var user = {"exp":1604460893,"user_name":"dani.bonilha@gmail.com","authorities":["ADMIN"],"client_id":"apogeo-app","scope":["read","write"]};

        request.subscribe(response => {
            this.validating = false;
            this.validated = true;
            this.authenticated = true;
            var user = JSON.parse(response['_body']);
            // this.user = new User(0, user.user_name, user.user_name, user.authorities, true);
            this.user = { "id": 0, "name": user.user_name, "email": user.user_name, "roles": user.authorities, "active": true, "password":"" };
            this.setUser(this.user, token);
            // console.log('[auth.service][validateToken] Token is valid, response: ' + JSON.stringify(this.user));
            var returnUrl = localStorage.getItem('returnUrl');
            if (returnUrl != null) {
                // console.log('[auth.service][validateToken] Redirecting to returnUrl: ' + returnUrl);
                this.router.navigate([returnUrl]);
                localStorage.removeItem('returnUrl');
            }
            // return true;
            // this.router.navigate(['surveys/question/list']);
            // this.router.navigate(['home']);

        }, err => {
            console.log('[auth.service][validateToken] Error validating token: ' + err);
            this.token = null;
            this.user = null;
            this.validating = false;
            this.validated = false;
            this.authenticated = false;
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.removeItem('returnUrl');
            // this.router.navigate(['home']);
            // return false;
        });

        return request;
    }

    getHeaders() {
        let headers = new Headers({ "Authorization": "Bearer " + this.token });
        return headers;
    }

}
