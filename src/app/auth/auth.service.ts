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

    constructor(private http: Http, private route: ActivatedRoute, private router: Router) { }

    isAuthenticated() {
        return this.token != null && this.validated;
    }

    setUser(user: User, token: string) {
        this.user = user;
        this.token = token;
        localStorage.setItem('token', this.token);
        this.userEmitter.emit(this.user);
    }

    logout() {
        this.token = null;
        this.user = null;
        localStorage.removeItem('token');
        localStorage.removeItem('returnUrl');
        this.userEmitter.emit();
    }

    validateToken(token: string) {
        if (token == null || this.validating) return;
        // console.log('Validating token: ' + token);
        this.validating = true;
        this.token = token;

        let url = environment.api.user;
        var request = this.http.get(url, new RequestOptions({ headers: this.getHeaders() }));
        request.subscribe(response => {
            this.validating = false;
            this.validated = true;
            this.authenticated = true;
            var obj = JSON.parse(response['_body']);
            var user = new User(obj.id, obj.email, obj.name, obj.roles, obj.active);
            this.setUser(user, token);
            // console.log('[auth.service][validateToken] Token is valid, response: ' + JSON.stringify(this.user));
            var returnUrl = localStorage.getItem('returnUrl');
            if (returnUrl != null) {
                // console.log('[auth.service][validateToken] Redirecting to returnUrl: ' + returnUrl);
                this.router.navigate([returnUrl]);
                localStorage.removeItem('returnUrl');
            } else {

                // this.router.navigate(['mail/template/list'], { preserveQueryParams: true });
                this.router.navigate(['surveys/question/list'], { preserveQueryParams: true });
            }

        }, err => {
            console.log('[auth.service][validateToken] Error validating token: ' + err);
            this.token = null;
            this.user = null;
            this.validating = false;
            this.validated = false;
            this.authenticated = false;
            localStorage.removeItem('token');
            localStorage.removeItem('returnUrl');
        });

        return request;
    }

    getHeaders() {
        return new Headers({ "Authorization": "Bearer " + this.token });
    }

}
