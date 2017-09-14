import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthFilter implements CanActivate {

    private redirecting: boolean = false;
    constructor(private router: Router, private authService: AuthService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.authService.isAuthenticated()) {
            // console.log('[AuthFilter] Authenticated');
            return true;
        }

        let params = new URLSearchParams(state.url.split('#')[1]);
        let access_token = params.get('access_token');
        if (access_token != null && access_token !== undefined) {
            this.authService.token = access_token;
            console.log('[AuthService] Found access_token: ' + access_token);
        }

        if (this.authService.token != null) {
            // console.log('Token not null - Return url: ' + state.url.split('#')[0]);
            localStorage.setItem('returnUrl', state.url.split('#')[0]);
            this.authService.validateToken(this.authService.token);

        } else {
            console.log('[AuthFilter] Unauthenticated, redirecting to login: ' + environment.api.login);
            // if(!this.redirecting) {
                // this.router.navigate([this.loginUrl]);
                // this.redirecting = true;
            // }
            window.location.href = environment.api.login;
        }

        return false;
    }
}
