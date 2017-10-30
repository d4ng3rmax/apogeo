import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobPositionService } from './jobPosition.service';
import { DepartmentService, DepartmentModalComponent } from '../departments';
import { IndustryService } from '../industries';
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
    providers: [JobPositionService, DepartmentService, IndustryService]
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

    // Modal editor
    @ViewChild(DepartmentModalComponent)
    departmentModal: DepartmentModalComponent;



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

        this.departmentService.objectEmitter.subscribe((data) => {
            this.object.department = data;
            this.loadDepartments();
        });
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
        jobAreas.push(this.createJobArea(areaPrincipal, "AREA_PRINCIPAL"));

        var outrasAreasPrincipaisMap = { 0: "OUTRA_AREA_PRINCIPAL_1", 1: "OUTRA_AREA_PRINCIPAL_2", 2: "OUTRA_AREA_PRINCIPAL_3", 3: "OUTRA_AREA_PRINCIPAL_4", 4: "OUTRA_AREA_PRINCIPAL_5", 5: "OUTRA_AREA_PRINCIPAL_6", 6: "OUTRA_AREA_PRINCIPAL_7" };
        let outrasAreasPrincipais = this.abordagens.filter(a => a.phase == 5);
        for(let i = 0; i<outrasAreasPrincipais.length; i++) jobAreas.push(this.createJobArea(outrasAreasPrincipais[i], outrasAreasPrincipaisMap[i]));
        
        var outrasAreasAlternativasMap = { 0: "OUTRA_AREA_ALTERNATIVA_1", 1: "OUTRA_AREA_ALTERNATIVA_2", 2: "OUTRA_AREA_ALTERNATIVA_3", 3: "OUTRA_AREA_ALTERNATIVA_4", 4: "OUTRA_AREA_ALTERNATIVA_5", 5: "OUTRA_AREA_ALTERNATIVA_6", 6: "OUTRA_AREA_ALTERNATIVA_7" };
        let outrasAreasAlternativas = this.abordagens.filter(a => a.phase == 5);
        for(let i = 0; i<outrasAreasAlternativas.length; i++) jobAreas.push(this.createJobArea(outrasAreasAlternativas[i], outrasAreasAlternativasMap[i]));
        
        let abordagemPrincipal = this.abordagens.filter(a => a.phase == 4)[0];
        jobAreas.push(this.createJobArea(abordagemPrincipal, "ABORDAGEM_PRINCIPAL"));

        var outrasAbordagensMap = { 0: "OUTRA_ABORDAGEM_PRINCIPAL_1", 1: "OUTRA_ABORDAGEM_PRINCIPAL_2", 2: "OUTRA_ABORDAGEM_PRINCIPAL_3", 3: "OUTRA_ABORDAGEM_PRINCIPAL_4", 4: "OUTRA_ABORDAGEM_PRINCIPAL_5", 5: "OUTRA_ABORDAGEM_PRINCIPAL_6", 6: "OUTRA_ABORDAGEM_PRINCIPAL_7" };
        let outrasAbordagemPrincipais = this.abordagens.filter(a => a.phase == 5);
        for(let i = 0; i<outrasAbordagemPrincipais.length; i++) jobAreas.push(this.createJobArea(outrasAbordagemPrincipais[i], outrasAbordagensMap[i]));
        
        var outrasAbordagemAlternativasMap = { 0: "OUTRA_ABORDAGEM_ALTERNATIVA_1", 1: "OUTRA_ABORDAGEM_ALTERNATIVA_2", 2: "OUTRA_ABORDAGEM_ALTERNATIVA_3", 3: "OUTRA_ABORDAGEM_ALTERNATIVA_4", 4: "OUTRA_ABORDAGEM_ALTERNATIVA_5", 5: "OUTRA_ABORDAGEM_ALTERNATIVA_6", 6: "OUTRA_ABORDAGEM_ALTERNATIVA_7" };
        let outrasAbordagemAlternativas = this.abordagens.filter(a => a.phase == 6);
        for(let i = 0; i<outrasAbordagemAlternativas.length; i++) { 
            jobAreas.push(this.createJobArea(outrasAbordagemAlternativas[i], outrasAbordagemAlternativasMap[i]));
            console.log('outrasAbordagemAlternativasMap[i] = ' + outrasAbordagemAlternativasMap[i] + ' , i = ' + i);
        }

        this.object.jobAreas = jobAreas;
    }

    createJobArea(area: any, jobAreaClassification: string) {
        return { "areaProfissional": { "id": area.id, "area": area.area, "familia": area.familia}, "jobAreaClassification": jobAreaClassification };
    }

    populateJobMotivacoes() {
        var jobMotivacoes = [];
        if (this.motivacaoForm.motivacao1 !== undefined) jobMotivacoes.push(this.motivacaoForm.motivacao1);
        if (this.motivacaoForm.motivacao2 !== undefined) jobMotivacoes.push(this.motivacaoForm.motivacao2);
        if (this.motivacaoForm.motivacao3 !== undefined) jobMotivacoes.push(this.motivacaoForm.motivacao3);
        if (this.motivacaoForm.motivacaoAlternativa1 !== undefined) jobMotivacoes.push(this.motivacaoForm.motivacaoAlternativa1);
        if (this.motivacaoForm.motivacaoAlternativa2 !== undefined) jobMotivacoes.push(this.motivacaoForm.motivacaoAlternativa2);
        if (this.motivacaoForm.motivacaoAlternativa3 !== undefined) jobMotivacoes.push(this.motivacaoForm.motivacaoAlternativa3);
        // if(this.object.motivacao1 !== undefined) jobMotivacoes.push({ "id": this.object.motivacao1.id, "jobMotivacaoClassification": "MOTIVACAO_PRINCIPAL_1", "motivacao": this.object.motivacao1.motivacao });
        // if(this.object.motivacao2 !== undefined) jobMotivacoes.push({ "id": this.object.motivacao2.id, "jobMotivacaoClassification": "MOTIVACAO_PRINCIPAL_2", "motivacao": this.object.motivacao2.motivacao });
        // if(this.object.motivacao3 !== undefined) jobMotivacoes.push({ "id": this.object.motivacao3.id, "jobMotivacaoClassification": "MOTIVACAO_PRINCIPAL_3", "motivacao": this.object.motivacao3.motivacao });
        // if(this.object.motivacaoAlternativa1 !== undefined) jobMotivacoes.push({ "id": this.object.motivacaoAlternativa1.id, "jobMotivacaoClassification": "MOTIVACAO_ALTERNATIVA_1", "motivacao": this.object.motivacaoAlternativa1.motivacao });
        // if(this.object.motivacaoAlternativa2 !== undefined) jobMotivacoes.push({ "id": this.object.motivacaoAlternativa2.id, "jobMotivacaoClassification": "MOTIVACAO_ALTERNATIVA_2", "motivacao": this.object.motivacaoAlternativa2.motivacao });
        // if(this.object.motivacaoAlternativa3 !== undefined) jobMotivacoes.push({ "id": this.object.motivacaoAlternativa3.id, "jobMotivacaoClassification": "MOTIVACAO_ALTERNATIVA_3", "motivacao": this.object.motivacaoAlternativa3.motivacao });
        this.object.jobMotivacao = jobMotivacoes;
        this.object.autoGerenciamento1 = 3;
        this.object.autoGerenciamento2 = 4;
        this.object.apogeo1 = 1;
        this.object.apogeo2 = 2;
    }

    addDepartment(event: any) {
        this.alert.obj.status = false;
        this.departmentModal.type = 'create';
        this.departmentModal.openModal(this, event, 'lg', false);
    }

}
