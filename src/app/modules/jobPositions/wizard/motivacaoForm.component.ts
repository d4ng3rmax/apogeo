import { Component, OnInit, AfterViewInit, ViewChild, ViewEncapsulation, Input, Injector } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobPositionService } from '../jobPosition.service';
import { DepartmentService } from '../../departments';
import { Alert, JobPosition } from '../../../models';
import { EditComponent } from '../../../components';
import { JobPositionComponent } from '../jobPosition.component';
declare var jquery: any;
declare var $: any;

@Component({
    selector: 'motivacaoForm',
    templateUrl: './motivacaoForm.component.html',
    styleUrls: ['../jobPosition.component.scss', '../../../app.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [JobPositionService, DepartmentService]
})
export class MotivacaoFormComponent implements OnInit {

    parent: JobPositionComponent;
    motivacoes: any[];
    formObjects: any = {
        'motivacaoPrincipal1': '',
        'motivacaoPrincipal2': '',
        'motivacaoPrincipal3': '',
        'motivacaoAlternativa1': '',
        'motivacaoAlternativa2': '',
        'motivacaoAlternativa3': ''
    }

    motivacoesMap: any = [
    { 'code': 'Fe', 'motivacao': 'Formadores emocionais' },
    { 'code': 'I', 'motivacao': 'Incentivadores' },
    { 'code': 'Fr', 'motivacao': 'Formadores racionais' },
    { 'code': 'Pe', 'motivacao': 'Preservadores emocionais' },
    { 'code': 'R', 'motivacao': 'Realizadores' },
    { 'code': 'Pr', 'motivacao': 'Preservadores racionais' },
    { 'code': 'Ie', 'motivacao': 'Integradores emocionais' },
    { 'code': 'C', 'motivacao': 'Criativos' },
    { 'code': 'Ir', 'motivacao': 'Integradores racionais' }
    ]

    autoGerenciamentoMap: any = [
    { 'code': 1, 'text': 'Mínimo' },
    { 'code': 2, 'text': 'Mediano (Padrão)' },
    { 'code': 3, 'text': 'Máximo' }
    ]

    constructor(protected route: ActivatedRoute,
        protected router: Router,
        protected service: JobPositionService,
        protected inj: Injector) {
        this.parent = this.inj.get(JobPositionComponent);

        // autoselect
        if(this.parent.object.id == null || this.parent.object.id === 0) {
            this.parent.object.apogeo1 = 2;
            this.parent.object.apogeo2 = 2;
            this.parent.object.autoGerenciamento1 = 2;
            this.parent.object.autoGerenciamento2 = 2;
            this.formObjects.apogeo1 = 2;
            this.formObjects.apogeo2 = 2;
            this.formObjects.autoGerenciamento1 = 2;
            this.formObjects.autoGerenciamento2 = 2;
            this.parent.refreshLabels();
            // this.formObjects.apogeo1 = this.autoGerenciamentoMap.filter(a => a.code === 2)[0].text;
            // this.formObjects.apogeo2 = this.autoGerenciamentoMap.filter(a => a.code === 2)[0].text;
            // this.formObjects.autoGerenciamento1 = this.autoGerenciamentoMap.filter(a => a.code === 2)[0].text;
            // this.formObjects.autoGerenciamento2 = this.autoGerenciamentoMap.filter(a => a.code === 2)[0].text;
        }
    }

    async ngOnInit() {
        // this.motivacoesMap = await this.service.getMotivacoesMap();
        // this.autoGerenciamentoMap = await this.service.getAutoGerenciamentoMap();
        // this.apogeoMap = await this.service.getApogeoMap();
        this.refresh();
    }

    submit() {
        const parent = this.parent;
        const objectMotivacoes = parent.object.jobMotivacao;
        const motivacoes = [];
        motivacoes.push(parent.createJobMotivacao(this.formObjects.motivacaoPrincipal1, parent.motivacoesPrincipaisClassifications[0]));
        motivacoes.push(parent.createJobMotivacao(this.formObjects.motivacaoPrincipal2, parent.motivacoesPrincipaisClassifications[1]));
        motivacoes.push(parent.createJobMotivacao(this.formObjects.motivacaoPrincipal3, parent.motivacoesPrincipaisClassifications[2]));

        motivacoes.push(parent.createJobMotivacao(this.formObjects.motivacaoAlternativa1, parent.motivacoesAlternativasClassifications[0]));
        motivacoes.push(parent.createJobMotivacao(this.formObjects.motivacaoAlternativa2, parent.motivacoesAlternativasClassifications[1]));
        motivacoes.push(parent.createJobMotivacao(this.formObjects.motivacaoAlternativa3, parent.motivacoesAlternativasClassifications[2]));

        parent.object.jobMotivacao = motivacoes;
        parent.object.autoGerenciamento1 = this.formObjects.autoGerenciamento1;
        parent.object.autoGerenciamento2 = this.formObjects.autoGerenciamento2;
        parent.object.apogeo1 = this.formObjects.apogeo1;
        parent.object.apogeo2 = this.formObjects.apogeo2;
        parent.refreshLabels();
    }

    refresh() {
        const phase = this.parent.phase;
        const parent = this.parent;
        const motivacoes = parent.object.jobMotivacao;

        if (motivacoes == null || motivacoes.length === 0) { return; }

        motivacoes.filter(m => m.jobMotivacaoClassification === parent.motivacoesPrincipaisClassifications[0]).map(m => this.formObjects.motivacaoPrincipal1 = m.motivacao);
        motivacoes.filter(m => m.jobMotivacaoClassification === parent.motivacoesPrincipaisClassifications[1]).map(m => this.formObjects.motivacaoPrincipal2 = m.motivacao);
        motivacoes.filter(m => m.jobMotivacaoClassification === parent.motivacoesPrincipaisClassifications[2]).map(m => this.formObjects.motivacaoPrincipal3 = m.motivacao);

        motivacoes.filter(m => m.jobMotivacaoClassification === parent.motivacoesAlternativasClassifications[0]).map(m => this.formObjects.motivacaoAlternativa1 = m.motivacao);
        motivacoes.filter(m => m.jobMotivacaoClassification === parent.motivacoesAlternativasClassifications[1]).map(m => this.formObjects.motivacaoAlternativa2 = m.motivacao);
        motivacoes.filter(m => m.jobMotivacaoClassification === parent.motivacoesAlternativasClassifications[2]).map(m => this.formObjects.motivacaoAlternativa3 = m.motivacao);

        this.formObjects.autoGerenciamento1 = parent.object.autoGerenciamento1;
        this.formObjects.autoGerenciamento2 = parent.object.autoGerenciamento2;
        this.formObjects.apogeo1 = parent.object.apogeo1;
        this.formObjects.apogeo2 = parent.object.apogeo2;
    }

    validate() {
        const parent = this.parent;
        let valid = false;
        parent.object.jobMotivacao.filter(m => m.jobMotivacaoClassification === parent.motivacoesPrincipaisClassifications[0] && m.motivacao).map(m => valid = true);
        if (!valid) {
            this.parent.alert.buildAlert(0, 'Motivação principal precisa ser escolhida', 4);
            return false;
        }

        if (!parent.object.autoGerenciamento1) {
            this.parent.alert.buildAlert(0, 'Indicador de Autogerenciamento principal precisa ser escolhido', 4);
            return false;
        }
        if (!parent.object.apogeo1) {
            this.parent.alert.buildAlert(0, 'Indicador APOGEO principal precisa ser escolhido', 4);
            return false;
        }

        return true;
    }
}
