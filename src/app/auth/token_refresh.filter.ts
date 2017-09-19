import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';

@Injectable()
export class TokenRefreshFilter implements CanActivate {

    private url: string;
    constructor(private router: Router, private authService: AuthService) {
    }

    // Takes care of token validation and wiring from the / and /home paths
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if(route.fragment == null) {
            if(!this.authService.isAuthenticated())
                window.location.href = environment.api.login;
            return false;
        }
        let token: string = route.fragment.match(/^(.*?)&/)[1].replace('access_token=', '');
        // console.log('[TokenRefreshFilter] ' + token + ' - AuthService token: ' + this.authService.token);
        if(token != null) {
            localStorage.setItem('returnUrl', '/solutions/result/list');
            this.authService.validateToken(token);
        }
        return true;
    }
}
