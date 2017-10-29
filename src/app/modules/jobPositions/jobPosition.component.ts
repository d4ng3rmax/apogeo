import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobPositionService } from './jobPosition.service';
import { DepartmentService } from '../departments';
import { Alert, JobPosition } from '../../models';
import { EditComponent } from '../../components';
import { AreaPrincipalFormComponent } from './wizard/areaPrincipalForm.component';
import { AbordagemPrincipalFormComponent } from './wizard/abordagemPrincipalForm.component';
import { MotivacaoFormComponent } from './wizard/motivacaoForm.component';
import { AutoGerenciamentoFormComponent } from './wizard/autoGerenciamentoForm.component';

declare var jquery: any;
declare var $: any;

@Component({
    selector: 'app-job-position',
    templateUrl: './jobPosition.component.html',
    styleUrls: ['./jobPosition.component.scss', '../../app.component.scss', '../../components/persist-navigation/persist-navigation.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [JobPositionService, DepartmentService]
})
export class JobPositionComponent extends EditComponent {

    @ViewChild('areaPrincipalForm')
    areaPrincipalForm: AreaPrincipalFormComponent;

    @ViewChild('abordagemPrincipalForm')
    abordagemPrincipalForm: AbordagemPrincipalFormComponent;

    @ViewChild('motivacaoForm')
    motivacaoForm: MotivacaoFormComponent;

    @ViewChild('autoGerenciamentoForm')
    autoGerenciamentoForm: AutoGerenciamentoFormComponent;

    selectedDepartment: any;
    departments: any[];
    departmentId: number;
    phase: number;
    pages: any = {
        "0": "this",
        "1": "areaPrincipalForm",
        "2": "areaPrincipalForm",
        "3": "areaPrincipalForm",
        "4": "abordagemPrincipalForm",
        "5": "abordagemPrincipalForm",
        "6": "abordagemPrincipalForm",
        "7": "motivacaoForm",
        "8": "autoGerenciamentoForm"
    };
    areas: any[];
    abordagens: any[];

    constructor(protected route: ActivatedRoute, protected router: Router,
        protected service: JobPositionService, protected departmentService: DepartmentService) {
        super(route, router, service);
        this.listPath = '/jobs/jobPosition/list';
        this.object = this.newEntity({ id: 0, name: '', department: {}, clientId: 0 });
    }

    newEntity(serverObject: any) {
        return new JobPosition(serverObject.id, serverObject.name, serverObject.department, serverObject.clientId, serverObject.jobAreas, serverObject.jobMotivacao, serverObject.autoGerenciamento1, serverObject.autoGerenciamento2, serverObject.apogeo1, serverObject.apogeo2);
    }

    async ngOnInit() {
        this.loadDepartments();
        super.ngOnInit();
        this.phase = 0;
    }

    next() {
        var phase = this.phase;
        var component = phase == 0 ? this : this[this.pages[this.phase]];

        if (this.phase == 0 || component === undefined) {
            this.phase++;

        } else if (component.validate()) {
            if (phase == 1 || phase == 2 || phase == 3) {
                this.areas = component.areas;
                // component.triggerAreaSelected();
            }
            if (phase == 4 || phase == 5 || phase == 6) {
                this.abordagens = component.areas;
                // component.triggerAreaSelected();
            }
            this.phase++;
        }
        // if (phase == 7) this.populateJobMotivacoes();
    }

    previous() {
        if (this.phase == 0) {
            this.router.navigate([this.listPath]);
        } else {
            --this.phase;
            var phase = this.phase;
            // Guarda os objetos com as selecioes e chama triggerAreaSelected para atualizar os objetos da nova pagina
            var component = phase == 0 ? this : this[this.pages[phase]];
            if (component !== undefined && (phase == 1 || phase == 2 || phase == 3)) component.areas = this.areas;
            if (component !== undefined && (phase == 4 || phase == 5 || phase == 6)) component.areas = this.abordagens;
            if (phase > 0 && phase < 7 && component !== undefined) component.triggerAreaSelected();
            // if (phase == 7) this.populateJobMotivacoes();
        }
    }

    async loadDepartments() {
        this.departments = [];
        this.departments = await this.departmentService.getResult();
    }

    populatedObject = (): Object => {
        this.populateJobAreas();
        // this.populateJobMotivacoes();
        return this.object;
    }

    postInit() {
    }

    // Validates first phase
    validate() {
        return true;
    }

    departmentCompareFn(d1: any, d2: any): boolean {
        return d1 && d2 ? d1.id === d2.id : d1 === d2;
    }

    populateJobAreas() {
        var jobAreas = [];
        let areaPrincipal = this.areas.filter(a => a.phase == 1)[0];
        jobAreas.push({ "areaProfissional": { "id": areaPrincipal.id }, "jobAreaClassification": "AREA_PRINCIPAL" });
        let outrasAreasPrincipais = this.areas.filter(a => a.phase == 2);
        if (outrasAreasPrincipais.length > 0) jobAreas.push({ "areaProfissional": { "id": outrasAreasPrincipais[0].id }, "jobAreaClassification": "OUTRA_AREA_PRINCIPAL_1" });
        if (outrasAreasPrincipais.length > 1) jobAreas.push({ "areaProfissional": { "id": outrasAreasPrincipais[1].id }, "jobAreaClassification": "OUTRA_AREA_PRINCIPAL_2" });
        if (outrasAreasPrincipais.length > 2) jobAreas.push({ "areaProfissional": { "id": outrasAreasPrincipais[2].id }, "jobAreaClassification": "OUTRA_AREA_PRINCIPAL_3" });
        if (outrasAreasPrincipais.length > 3) jobAreas.push({ "areaProfissional": { "id": outrasAreasPrincipais[3].id }, "jobAreaClassification": "OUTRA_AREA_PRINCIPAL_4" });
        if (outrasAreasPrincipais.length > 4) jobAreas.push({ "areaProfissional": { "id": outrasAreasPrincipais[4].id }, "jobAreaClassification": "OUTRA_AREA_PRINCIPAL_5" });
        if (outrasAreasPrincipais.length > 5) jobAreas.push({ "areaProfissional": { "id": outrasAreasPrincipais[5].id }, "jobAreaClassification": "OUTRA_AREA_PRINCIPAL_6" });
        if (outrasAreasPrincipais.length > 6) jobAreas.push({ "areaProfissional": { "id": outrasAreasPrincipais[6].id }, "jobAreaClassification": "OUTRA_AREA_PRINCIPAL_7" });

        let outrasAreasAlternativas = this.areas.filter(a => a.phase == 3);
        if (outrasAreasAlternativas.length > 0) jobAreas.push({ "areaProfissional": { "id": outrasAreasAlternativas[0].id }, "jobAreaClassification": "OUTRA_AREA_ALTERNATIVA_1" });
        if (outrasAreasAlternativas.length > 1) jobAreas.push({ "areaProfissional": { "id": outrasAreasAlternativas[1].id }, "jobAreaClassification": "OUTRA_AREA_ALTERNATIVA_2" });
        if (outrasAreasAlternativas.length > 2) jobAreas.push({ "areaProfissional": { "id": outrasAreasAlternativas[2].id }, "jobAreaClassification": "OUTRA_AREA_ALTERNATIVA_3" });
        if (outrasAreasAlternativas.length > 3) jobAreas.push({ "areaProfissional": { "id": outrasAreasAlternativas[3].id }, "jobAreaClassification": "OUTRA_AREA_ALTERNATIVA_4" });
        if (outrasAreasAlternativas.length > 4) jobAreas.push({ "areaProfissional": { "id": outrasAreasAlternativas[4].id }, "jobAreaClassification": "OUTRA_AREA_ALTERNATIVA_5" });
        if (outrasAreasAlternativas.length > 5) jobAreas.push({ "areaProfissional": { "id": outrasAreasAlternativas[5].id }, "jobAreaClassification": "OUTRA_AREA_ALTERNATIVA_6" });
        if (outrasAreasAlternativas.length > 6) jobAreas.push({ "areaProfissional": { "id": outrasAreasAlternativas[6].id }, "jobAreaClassification": "OUTRA_AREA_ALTERNATIVA_7" });

        let abordagemPrincipal = this.abordagens.filter(a => a.phase == 4)[0];
        jobAreas.push({ "areaProfissional": { "id": abordagemPrincipal.id }, "jobAreaClassification": "ABORDAGEM_PRINCIPAL" });

        let outrasAbordagemPrincipais = this.abordagens.filter(a => a.phase == 5);
        if (outrasAbordagemPrincipais.length > 0) jobAreas.push({ "areaProfissional": { "id": outrasAbordagemPrincipais[0].id }, "jobAreaClassification": "OUTRA_ABORDAGEM_PRINCIPAL_1" });
        if (outrasAbordagemPrincipais.length > 1) jobAreas.push({ "areaProfissional": { "id": outrasAbordagemPrincipais[1].id }, "jobAreaClassification": "OUTRA_ABORDAGEM_PRINCIPAL_2" });
        if (outrasAbordagemPrincipais.length > 2) jobAreas.push({ "areaProfissional": { "id": outrasAbordagemPrincipais[2].id }, "jobAreaClassification": "OUTRA_ABORDAGEM_PRINCIPAL_3" });
        if (outrasAbordagemPrincipais.length > 3) jobAreas.push({ "areaProfissional": { "id": outrasAbordagemPrincipais[3].id }, "jobAreaClassification": "OUTRA_ABORDAGEM_PRINCIPAL_4" });
        if (outrasAbordagemPrincipais.length > 4) jobAreas.push({ "areaProfissional": { "id": outrasAbordagemPrincipais[4].id }, "jobAreaClassification": "OUTRA_ABORDAGEM_PRINCIPAL_5" });
        if (outrasAbordagemPrincipais.length > 5) jobAreas.push({ "areaProfissional": { "id": outrasAbordagemPrincipais[5].id }, "jobAreaClassification": "OUTRA_ABORDAGEM_PRINCIPAL_6" });
        if (outrasAbordagemPrincipais.length > 6) jobAreas.push({ "areaProfissional": { "id": outrasAbordagemPrincipais[6].id }, "jobAreaClassification": "OUTRA_ABORDAGEM_PRINCIPAL_7" });

        let outrasAbordagemAlternativas = this.abordagens.filter(a => a.phase == 6);
        if (outrasAbordagemAlternativas.length > 0) jobAreas.push({ "areaProfissional": { "id": outrasAbordagemAlternativas[0].id }, "jobAreaClassification": "OUTRA_ABORDAGEM_ALTERNATIVA_1" });
        if (outrasAbordagemAlternativas.length > 1) jobAreas.push({ "areaProfissional": { "id": outrasAbordagemAlternativas[1].id }, "jobAreaClassification": "OUTRA_ABORDAGEM_ALTERNATIVA_2" });
        if (outrasAbordagemAlternativas.length > 2) jobAreas.push({ "areaProfissional": { "id": outrasAbordagemAlternativas[2].id }, "jobAreaClassification": "OUTRA_ABORDAGEM_ALTERNATIVA_3" });
        if (outrasAbordagemAlternativas.length > 3) jobAreas.push({ "areaProfissional": { "id": outrasAbordagemAlternativas[3].id }, "jobAreaClassification": "OUTRA_ABORDAGEM_ALTERNATIVA_4" });
        if (outrasAbordagemAlternativas.length > 4) jobAreas.push({ "areaProfissional": { "id": outrasAbordagemAlternativas[4].id }, "jobAreaClassification": "OUTRA_ABORDAGEM_ALTERNATIVA_5" });
        if (outrasAbordagemAlternativas.length > 5) jobAreas.push({ "areaProfissional": { "id": outrasAbordagemAlternativas[5].id }, "jobAreaClassification": "OUTRA_ABORDAGEM_ALTERNATIVA_6" });
        if (outrasAbordagemAlternativas.length > 6) jobAreas.push({ "areaProfissional": { "id": outrasAbordagemAlternativas[6].id }, "jobAreaClassification": "OUTRA_ABORDAGEM_ALTERNATIVA_7" });

        this.object.jobAreas = jobAreas;
    }

    populateJobMotivacoes() {
        var jobMotivacoes = [];
        if(this.motivacaoForm.motivacao1 !== undefined) jobMotivacoes.push(this.motivacaoForm.motivacao1);
        if(this.motivacaoForm.motivacao2 !== undefined) jobMotivacoes.push(this.motivacaoForm.motivacao2);
        if(this.motivacaoForm.motivacao3 !== undefined) jobMotivacoes.push(this.motivacaoForm.motivacao3);
        if(this.motivacaoForm.motivacaoAlternativa1 !== undefined) jobMotivacoes.push(this.motivacaoForm.motivacaoAlternativa1);
        if(this.motivacaoForm.motivacaoAlternativa2 !== undefined) jobMotivacoes.push(this.motivacaoForm.motivacaoAlternativa2);
        if(this.motivacaoForm.motivacaoAlternativa3 !== undefined) jobMotivacoes.push(this.motivacaoForm.motivacaoAlternativa3);
        // if(this.object.motivacao1 !== undefined) jobMotivacoes.push({ "id": this.object.motivacao1.id, "jobMotivacaoClassification": "MOTIVACAO_PRINCIPAL_1", "motivacao": this.object.motivacao1.motivacao });
        // if(this.object.motivacao2 !== undefined) jobMotivacoes.push({ "id": this.object.motivacao2.id, "jobMotivacaoClassification": "MOTIVACAO_PRINCIPAL_2", "motivacao": this.object.motivacao2.motivacao });
        // if(this.object.motivacao3 !== undefined) jobMotivacoes.push({ "id": this.object.motivacao3.id, "jobMotivacaoClassification": "MOTIVACAO_PRINCIPAL_3", "motivacao": this.object.motivacao3.motivacao });
        // if(this.object.motivacaoAlternativa1 !== undefined) jobMotivacoes.push({ "id": this.object.motivacaoAlternativa1.id, "jobMotivacaoClassification": "MOTIVACAO_ALTERNATIVA_1", "motivacao": this.object.motivacaoAlternativa1.motivacao });
        // if(this.object.motivacaoAlternativa2 !== undefined) jobMotivacoes.push({ "id": this.object.motivacaoAlternativa2.id, "jobMotivacaoClassification": "MOTIVACAO_ALTERNATIVA_2", "motivacao": this.object.motivacaoAlternativa2.motivacao });
        // if(this.object.motivacaoAlternativa3 !== undefined) jobMotivacoes.push({ "id": this.object.motivacaoAlternativa3.id, "jobMotivacaoClassification": "MOTIVACAO_ALTERNATIVA_3", "motivacao": this.object.motivacaoAlternativa3.motivacao });
        this.object.jobMotivacao = jobMotivacoes;
    }
}
