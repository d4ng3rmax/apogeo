import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth';
import { environment } from '../../environments/environment';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    @Input() menuEnabled: boolean;
    module: string;
    url: string;
    token: string;
    user: any;
    loginUrl: string;

    constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService) {
        this.loginUrl = environment.api.login;
        this.router.events.subscribe((res) => {
            this.url = this.router.url;
            // Pega o modulo na primeira parte depois da barra para definir menu ativo
            var exp = this.url.split(/^\/([^\/]*).*$/);
            // console.log('Exp: ' + exp[1]);
            this.module = exp[1];
        });

        // this.route.queryParams.subscribe(params => {
        //   console.log('queryParams = ' + JSON.stringify(params))
        // });

        this.user = this.authService.user;
        this.authService.userEmitter.subscribe(user => {
            // console.log('[header.component][userEmitter] Received user: ' + JSON.stringify(user));
            this.user = user;
        });
    }

    ngOnInit() {
    }

    selectModule(module: string) {
        this.module = module;
        if (module == 'solutions') {
            this.router.navigate(['/solutions/result/list']);
        } else if (module == 'surveys') {
            this.router.navigate(['/surveys/question/list']);
        } else if (module == 'mail') {
            this.router.navigate(['/mail/template/list']);
        }
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['home']);
    }
}
