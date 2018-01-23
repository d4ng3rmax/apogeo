import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth';
import { InfoModalComponent } from '../components';
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
    subModule: string; // used to get path for infoModal
    url: string;
    token: string;
    user: any;
    loginUrl: string;
    isAdmin: boolean = false;
    isDistributor: boolean = false;

    @ViewChild('infoModal')
    infoModal: InfoModalComponent;

    helpModalMap: any = {
        'solutions/result': {'title': 'Resultados', 'size': 'lg', 'content': 'Teste', 'url': ''},
        'solutions/solution': {'title': 'Soluções', 'size': 'lg', 'content': 'Teste', 'url': ''},
        'surveys/question': {'title': 'Questões', 'size': 'center', 'content': 'Teste', 'url': ''},
        'surveys/page': {'title': 'Páginas', 'size': 'center', 'content': 'Teste', 'url': ''},
        'surveys/survey': {'title': 'Questionários', 'size': 'center', 'content': 'Teste', 'url': ''},
        'jobs/jobPosition': {'title': 'Cargos', 'size': 'center', 'content': 'Teste de Conteudo<br/>De cargos Teste teste teste teste teste teste', 'url': ''},
        'jobs/department': {'title': 'Departamentos', 'size': 'center', 'content': 'Teste', 'url': ''},
        'jobs/industry': {'title': 'Ramos', 'size': 'center', 'content': 'Teste', 'url': ''},
        'mail/template': {'title': 'Emails', 'size': 'center', 'content': 'Teste', 'url': ''},
        'sers': {'title': 'Usuários', 'size': 'center', 'content': 'Teste', 'url': ''},
        'tokens': {'title': 'Tokens', 'size': 'center', 'content': 'Teste', 'url': ''},
        'processes': {'title': 'Processos', 'size': 'lg', 'content': 'Teste', 'url': ''}
    };

    // menuMap:any = { 'settings': ['solutions', 'surveys', 'mail'], 'users': ['users', 'tokens'], 'processes': ['processes'] };

    constructor(private route: ActivatedRoute, private router: Router, public authService: AuthService) {
        this.loginUrl = environment.api.forceLogin;
        this.router.events.subscribe((res) => {
            this.url = this.router.url;
            // Pega o modulo na primeira parte depois da barra para definir menu ativo
            var exp = this.url.split('/');
            this.module = exp[1];
            if(exp.length > 1) {
                this.subModule = exp[2];
            }
        });

        this.user = this.authService.user;
        this.authService.userEmitter.subscribe(user => {
            this.user = user;
            this.isAdmin = this.authService.isAdmin();
            this.isDistributor = this.authService.isDistributor();
        });
    }

    ngOnInit() {
        // this.openHelpModal();
    }

    selectModule(module: string) {
        this.module = module;
        if (module === 'solutions') {
            this.router.navigate(['/solutions/result/list']);
        } else if (module === 'surveys') {
            this.router.navigate(['/surveys/question/list']);
        } else if (module === 'mail') {
            this.router.navigate(['/mail/template/list']);

        } else if (module === 'jobs') {
            this.router.navigate(['/jobs/jobPosition/list']);

        } else if (module === 'users') {
            this.router.navigate(['/users/user/list']);
        } else if (module === 'tokens') {
            this.router.navigate(['/users/user/list']);

        } else if (module === 'processes') {
            this.router.navigate(['/processes/process/list']);

        } else if (module === 'register') {
            this.router.navigate(['/register/distributor/list']);
        }
    }

    openHelpModal() {
        if(!this.module) {
            return {};
        }
        const data = this.helpModalMap[this.module + '/' + this.subModule];
        this.infoModal.open(data.title, data.content, data.url, data.size);
    }

    logout() {
        this.authService.logout();
        // window.location.replace(environment.api.login);
        window.location.replace(environment.api.forceLogin);
        // document.location.href = environment.api.login;
    }
}
