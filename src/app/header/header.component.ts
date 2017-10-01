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
    // /: string; // processes | users | settings
    module: string; // settings: { solutions | surveys | mail }, users: { users | tokens }, processes: { processes }
    url: string;
    token: string;
    user: any;
    loginUrl: string;
    isAdmin: boolean = false;
    isDistributor: boolean = false;

    // menuMap:any = { 'settings': ['solutions', 'surveys', 'mail'], 'users': ['users', 'tokens'], 'processes': ['processes'] };

    constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService) {
        this.loginUrl = environment.api.forceLogin;
        this.router.events.subscribe((res) => {
            this.url = this.router.url;
            // Pega o modulo na primeira parte depois da barra para definir menu ativo
            var exp = this.url.split('/');
            this.module = exp[1];
            // Get area based on module from menuMap
            // for (var area in this.menuMap) {
            //     if (!this.menuMap.hasOwnProperty(area)) { continue; }
            //     if (this.menuMap[area].indexOf(this.module) > -1) {
            //         this.area = area;
            //         break;
            //     }
            // }
        });

        this.user = this.authService.user;
        this.authService.userEmitter.subscribe(user => {
            this.user = user;
            this.isAdmin = this.authService.isAdmin();
            this.isDistributor = this.authService.isDistributor();
        });
    }

    ngOnInit() {
    }

    // selectArea(area: string) {
        // this.route.params['area'] = area;
        // this.area = area;
        // if (module == 'processes') {
        //     this.router.navigate(['/solutions/result/list']);
        // } else if (module == 'settings') {
        //     this.router.navigate(['/surveys/question/list']);
        // } else if (module == 'users') {
        //     this.router.navigate(['/mail/template/list']);
        // }
    // }

    selectModule(module: string) {
        this.module = module;
        if (module == 'solutions') {
            this.router.navigate(['/solutions/result/list']);
        } else if (module == 'surveys') {
            this.router.navigate(['/surveys/question/list']);
        } else if (module == 'mail') {
            this.router.navigate(['/mail/template/list']);

        } else if (module == 'users') {
            this.router.navigate(['/users/user/list']);
        } else if (module == 'tokens') {
            this.router.navigate(['/users/user/list']);

        } else if (module == 'processes') {
            this.router.navigate(['/processes/process/list']);
        }
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['home']);
    }
}
