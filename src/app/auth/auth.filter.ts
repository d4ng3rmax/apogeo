import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, NavigationCancel } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthFilter implements CanActivate {

    private redirecting: boolean = false;
    constructor(private router: Router, private authService: AuthService) { }


    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.authService.isAuthenticated()) {
            return true;
        }

        var m = /access_token=([\w|-]+)/.exec(window.location.href);
        let token;
        if (m) {
            token = m[1];
        }
        if (token !== null && token !== undefined && token !== '') {
            console.log('[AuthFilter] Validating token from access_token parameter: ' + token);
            this.authService.validateToken(token);
            return false
        }

        // Reload token from localStorage
        token = localStorage.getItem('token');
        if (token !== null && token !== undefined && token !== '') {
            console.log('[AuthFilter] Validating token from storage: ' + token);
            this.authService.validateToken(localStorage.getItem('token'));
            return false;
        }

        if (this.authService.token !== null && this.authService.token !== undefined && this.authService.token !== '') {
            console.log('[AuthFilter] Validating token from authService: ' + this.authService.token);
            localStorage.setItem('returnUrl', state.url.split('#')[0]);
            this.authService.validateToken(this.authService.token);

        } else {
            console.log('[AuthFilter] Unauthenticated, redirecting to login: ' + environment.api.login);
            window.location.href = environment.api.login;
        }

        return false;
    }
}
