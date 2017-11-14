import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../auth';
import { JobPositionService } from './jobPosition.service';
import { DepartmentService, DepartmentModalComponent } from '../departments';
import { IndustryService } from '../industries';
import { Alert, JobPosition } from '../../models';
import { EditComponent } from '../../components';
import { TemperamentoMapFormComponent } from './wizard/temperamentoMapForm.component';
import { ComportamentoMapFormComponent } from './wizard/comportamentoMapForm.component';
import { MotivacaoFormComponent } from './wizard/motivacaoForm.component';
import { ClientService } from '../clients';

declare var jquery: any;
declare var $: any;

@Component({
    selector: 'app-job-position',
    templateUrl: './jobPosition.component.html',
    styleUrls: ['./jobPosition.component.scss', '../../app.component.scss', '../../components/persist-navigation/persist-navigation.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [JobPositionService, DepartmentService, IndustryService, ClientService]
})
export class JobPositionComponent extends EditComponent {

    @ViewChild('temperamentoMapForm')
    temperamentoMapForm: TemperamentoMapFormComponent;

    @ViewChild('comportamentoMapForm')
    comportamentoMapForm: ComportamentoMapFormComponent;

    @ViewChild('motivacaoForm')
    motivacaoForm: MotivacaoFormComponent;

    // Modal editor
    @ViewChild(DepartmentModalComponent)
    departmentModal: DepartmentModalComponent;

    departments: any[];
    areas: any[];
    client: any = {};
    clients: any[];

    // --------------------------------------------------
    // Wizard properties
    // --------------------------------------------------
    phase: number;

    // Used to dynamically invoke wizard children methods
    pages: any = {
        '0': 'this',
        '1': 'temperamentoMapForm',
        '2': 'temperamentoMapForm',
        '3': 'temperamentoMapForm',
        '4': 'comportamentoMapForm',
        '5': 'comportamentoMapForm',
        '6': 'comportamentoMapForm',
        '7': 'motivacaoForm'
    };

    // Wizard page titles
    pageTitles: any = {
        '0': 'Etapa 0',
        '1': 'Etapa 1 - Escolha a área ideal para o cargo segundo o Temperamento',
        '2': 'Etapa 2 - Escolha outras áreas para o cargo segundo o Temperamento',
        '3': 'Etapa 3 - Escolha áreas alternativas para o cargo segundo o Temperamento',
        '4': 'Etapa 4 - Escolha a área principal para o cargo segundo o Comportamento',
        '5': 'Etapa 5 - Escolha outras áreas principais para o cargo segundo o Comportamento',
        '6': 'Etapa 6 - Escolha áreas alternativas para o cargo segundo o Comportamento',
        '7': 'Etapa 7 - Escolha as motivações e o nível dos Indicadores adequados para o cargo'
    }

    // --------------------------------------------------
    // --------------------------------------------------

    // Card labels
    formLabels: any = {
        'temperamentoAreaIdeal': '',
        'temperamentoAreasPrincipais': '',
        'temperamentoAreasAlternativas': '',
        'comportamentoAreaIdeal': '',
        'comportamentoAreasPrincipais': '',
        'comportamentoAreasAlternativas': '',
        'motivacoesPrincipais': '',
        'motivacoesAlternativas': '',
        'autoGerenciamento1': '',
        'autoGerenciamento2': '',
        'apogeo1': '',
        'apogeo2': ''
    }

    // Mappings used to serialize/deserialize jobAreas and jobMotivacoes
    temperamentoAreaIdealClassification: any = ['AREA_PRINCIPAL'];
    temperamentoAreasPrincipaisClassifications: any = ['OUTRA_AREA_PRINCIPAL_1', 'OUTRA_AREA_PRINCIPAL_2', 'OUTRA_AREA_PRINCIPAL_3', 'OUTRA_AREA_PRINCIPAL_4', 'OUTRA_AREA_PRINCIPAL_5', 'OUTRA_AREA_PRINCIPAL_6', 'OUTRA_AREA_PRINCIPAL_7'];
    temperamentoAreasAlternativasClassifications: any = ['OUTRA_AREA_ALTERNATIVA_1', 'OUTRA_AREA_ALTERNATIVA_2', 'OUTRA_AREA_ALTERNATIVA_3', 'OUTRA_AREA_ALTERNATIVA_4', 'OUTRA_AREA_ALTERNATIVA_5', 'OUTRA_AREA_ALTERNATIVA_6', 'OUTRA_AREA_ALTERNATIVA_7'];
    comportamentoAreaIdealClassification: any = ['ABORDAGEM_PRINCIPAL'];
    comportamentoAreasPrincipaisClassifications: any = ['OUTRA_ABORDAGEM_PRINCIPAL_1', 'OUTRA_ABORDAGEM_PRINCIPAL_2', 'OUTRA_ABORDAGEM_PRINCIPAL_3', 'OUTRA_ABORDAGEM_PRINCIPAL_4', 'OUTRA_ABORDAGEM_PRINCIPAL_5', 'OUTRA_ABORDAGEM_PRINCIPAL_5', 'OUTRA_ABORDAGEM_PRINCIPAL_6'];
    comportamentoAreasAlternativasClassifications: any = ['OUTRA_ABORDAGEM_ALTERNATIVA_1', 'OUTRA_ABORDAGEM_ALTERNATIVA_2', 'OUTRA_ABORDAGEM_ALTERNATIVA_3', 'OUTRA_ABORDAGEM_ALTERNATIVA_4', 'OUTRA_ABORDAGEM_ALTERNATIVA_5', 'OUTRA_ABORDAGEM_ALTERNATIVA_6', 'OUTRA_ABORDAGEM_ALTERNATIVA_7'];
    motivacoesPrincipaisClassifications: any = ['MOTIVACAO_PRINCIPAL_1', 'MOTIVACAO_PRINCIPAL_2', 'MOTIVACAO_PRINCIPAL_3'];
    motivacoesAlternativasClassifications: any = ['MOTIVACAO_ALTERNATIVA_1', 'MOTIVACAO_ALTERNATIVA_2', 'MOTIVACAO_ALTERNATIVA_3'];
    displayTooltip = false;
    hoverArea: any = {};

    // --------------------------------------------------
    // Tooltips
    // --------------------------------------------------

    infoModalMap: any = {
        'areasPrincipais': {
            'title': 'Áreas Principais',
            'size': 'lg',
            'content': `Informacoes sobre areas principais. teste de linha longa ajuste automatico de largura teste mais texto,
            Informacoes sobre areas principais. teste de linha longa ajuste automatico de largura teste mais texto
            teste de linha longa ajuste automatico de largura teste mais texto<br />
            teste de linha longa ajuste automatico<br />
            Outra linha <br />
            Outra linha`
        }, 'motivacaoPrincipal': {
            'title': 'Motivação Principal',
            'size': 'md',
            'content': `Informacoes sobre motivação principal, Modal menor, <br />
            Informacoes sobre areas principais. teste de linha longa ajuste automatico de largura teste mais texto<br />
            teste de linha longa ajuste automatico de largura teste mais texto<br />
            teste de linha longa ajuste automatico<br />
            Outra linha <br />
            Outra linha`
        }, 'motivacaoAlternativa': {
            'title': 'Motivação Alternativa',
            'size': 'md',
            'content': `Informacoes sobre motivação Alternativa, Modal menor, <br />
            Informacoes sobre areas principais. teste de linha longa ajuste <br />
            teste de linha longa ajuste automatico de largura teste mais texto<br />
            teste de linha longa ajuste automatico<br />
            Outra linha <br />
            Outra linha`
        },
        'autoGerenciamento': {
            'title': 'Índice de Auto Gerenciamento',
            'size': 'md',
            'content': `Informacoes sobre Índice de Auto Gerenciamento, <br />
            Informacoes sobre areas principais. teste de linha longa ajuste automatico <br />
            teste de linha longa ajuste automatico de largura teste mais texto<br />
            teste de linha longa ajuste automatico<br />
            Outra linha <br />
            Outra linha`
        },
        'indicadorApogeo': {
            'title': 'Indicador Apogeo',
            'size': 'md',
            'content': `Informacoes sobre Indicador Apogeo <br />
            Informacoes sobre areas principais. teste de linha longa ajuste automatico<br />
            teste de linha longa ajuste automatico de largura teste mais texto<br />
            teste de linha longa ajuste automatico<br />
            Outra linha <br />
            Outra linha` }
        }

        openInfoModal(data: any) {
            this.infoModal.open(data.title, data.content, data.size);
        }

        // --------------------------------------------------
        // --------------------------------------------------

        constructor(protected route: ActivatedRoute, protected router: Router,
            protected service: JobPositionService, protected departmentService: DepartmentService, protected clientService: ClientService, public authService: AuthService) {
            super(route, router, service);
            this.listPath = '/jobs/jobPosition/list';
            this.object = this.newEntity({ id: 0, name: '', department: {}, clientId: '' });
            if (authService.isManager()) {
                this.object.clientId = authService.user.client.id;
                }
                this.object.client = { 'id': this.object.clientId };
                this.departmentService.objectEmitter.subscribe((data) => {
                    this.object.department = data;
                    this.loadDepartments();
                });
            }

            newEntity(serverObject: any) {
                return new JobPosition(serverObject.id, serverObject.name, serverObject.department, serverObject.clientId, serverObject.jobAreas, serverObject.jobMotivacao, serverObject.autoGerenciamento1, serverObject.autoGerenciamento2, serverObject.apogeo1, serverObject.apogeo2, serverObject.areaNome, serverObject.temperamento, serverObject.maleUrl, serverObject.femaleUrl);
            }

            async ngOnInit() {
                this.loadDepartments();
                const areas = await this.service.getAreas();
                this.clients = await this.clientService.getResult();
                if (this.authService.isManager()) {
                    this.client = this.clients[0];
                }
                // Enrich areas
                this.areas = areas.map(a => {
                    a.selected = false;
                    a.femaleUrl = 'https://avatars.dicebear.com/v1/female/jane-doe/200.png';
                    a.maleUrl = 'https://avatars.dicebear.com/v1/male/john-doe/200.png';
                    return a;
                });
                super.ngOnInit();
            }

            postInit() {
                if(this.object.id && this.object.name && this.object.department && Object.keys(this.object.department).length > 0) {
                    this.phase = 1;
                } else {
                    this.phase = 0;
                }
                this.object.client = { 'id': this.object.clientId };
                this.refreshForm();
            }

            populatedObject = (): Object => {
                if (this.authService.isManager()) {
                    this.object.clientId = this.authService.user.client.id;
                } else {
                    this.object.clientId = this.client.id;
                }
                if (this.object.id === 0)  { delete this.object.id; }
                if(this.authService.isManager()) {
                    delete this.object.clientId;
                } else {
                    this.object.clientId = this.object.client.id;
                }
                // delete this.object.clientId;
                // delete this.object.client;
                return this.object;
            }


            // Called by next() on phase 0 or by the save button on other phases
            validate() {
                // Validate child form if called by save button instead of Next/Finish
                if (this.phase > 0 && !this.validateForm()) { return; }
                if (!this.object.name) {
                    this.alert.buildAlert(0, 'O nome do cargo precisa ser informado', 4);
                    return false;
                }
                if (!this.object.department || Object.keys(this.object.department).length === 0) {
                    this.alert.buildAlert(0, 'O departamento precisa ser escolhido', 4);
                    return false;
                }
                // if (!this.authService.isManager() && !this.object.client) {
                //     this.alert.buildAlert(0, 'O cliente precisa ser escolhido', 4);
                //     return false;
                // }

                return true;
            }


            // --------------------------------------------------
            // Wizard & Children actions
            // --------------------------------------------------

            getFormComponent() {
                if (this.phase === 0) { return };
                return this[this.pages[this.phase]];
            }

            refreshForm() {
                const component = this.getFormComponent();
                if (component) { component.refresh(); }
                this.refreshLabels();
            }

            submitForm() {
                const component = this.getFormComponent();
                if (component) { component.submit(); }
            }

            validateForm() {
                const component = this.getFormComponent();
                if (component) { return component.validate(); }
            }

            next() {
                const component = this[this.pages[this.phase]];
                if (this.phase === 0 && !this.validate()) { return; }
                if (this.phase > 0 && !this.validateForm()) { return; }
                this.submitForm();
                if (this.phase === 7) {
                    if (this.urlId) { this.update(null); } else { this.save(null); }
                    return;
                }
                this.phase++;
                this.areas.map(a => a.selected = false);
                this.refreshForm();
            }

            previous() {
                if (this.phase === 0) { this.router.navigate([this.listPath]); return; }
                const component = this[this.pages[this.phase]];
                if (!this.validateForm()) { return; }
                this.submitForm();
                this.phase--;
                this.areas.map(a => a.selected = false);
                this.refreshForm();
            }

            setPhase(phase: number) {
                if (this.phase === 0 && !this.validate()) { return; }
                if (this.phase > 0 && !this.validateForm()) { return; }
                this.phase = phase;
                this.areas.map(a => a.selected = false);
                this.refreshForm();
            }

            // --------------------------------------------------
            // --------------------------------------------------



            // --------------------------------------------------
            // Departments
            // --------------------------------------------------

            async loadDepartments() {
                this.departments = [];
                this.departments = await this.departmentService.getResult();
            }

            addDepartment(event: any) {
                this.alert.obj.status = false;
                this.departmentModal.type = 'create';
                this.departmentModal.openModal(this, event, 'lg', false);
            }

            entityCompareFn(d1: any, d2: any): boolean {
                return d1 && d2 ? d1.id === d2.id : d1 === d2;
            }

            // --------------------------------------------------
            // --------------------------------------------------



            // Called by children submit()
            createJobArea(area: any, jobAreaClassification: string) {
                return { 'areaProfissional': { 'id': area.id, 'area': area.area, 'familia': area.familia }, 'jobAreaClassification': jobAreaClassification };
            }

            // Called by children submit()
            createJobMotivacao(motivacao: string, jobMotivacaoClassification: string) {
                return { 'motivacao': motivacao, 'jobMotivacaoClassification': jobMotivacaoClassification };
            }




            // --------------------------------------------------
            // Card Labels
            // --------------------------------------------------

            refreshLabels() {
                const areas = this.object.jobAreas;
                this.formLabels.temperamentoAreaIdeal = this.buildLabel(areas, this.temperamentoAreaIdealClassification);
                this.formLabels.temperamentoAreasPrincipais = this.buildLabel(areas, this.temperamentoAreasPrincipaisClassifications);
                this.formLabels.temperamentoAreasAlternativas = this.buildLabel(areas, this.temperamentoAreasAlternativasClassifications);
                this.formLabels.comportamentoAreaIdeal = this.buildLabel(areas, this.comportamentoAreaIdealClassification);
                this.formLabels.comportamentoAreasPrincipais = this.buildLabel(areas, this.comportamentoAreasPrincipaisClassifications);
                this.formLabels.comportamentoAreasAlternativas = this.buildLabel(areas, this.comportamentoAreasAlternativasClassifications);

                const motivacoes = this.object.jobMotivacao;
                this.formLabels.motivacoesPrincipais = this.buildMotivacoesLabel(motivacoes, this.motivacoesPrincipaisClassifications);
                this.formLabels.motivacoesAlternativas = this.buildMotivacoesLabel(motivacoes, this.motivacoesAlternativasClassifications);

                this.formLabels.autoGerenciamento1 = this.object.autoGerenciamento1;
                this.formLabels.autoGerenciamento2 = this.object.autoGerenciamento2;
                this.formLabels.apogeo1 = this.object.apogeo1;
                this.formLabels.apogeo2 = this.object.apogeo2;
            }

            buildLabel(areas: any[], selectedAreaNames: string[]) {
                let label = String();
                for (let a1 of areas) {
                    if (selectedAreaNames.indexOf(a1.jobAreaClassification) === -1) { continue; }
                    for (let a2 of this.areas) {
                        if (a2.id !== a1.areaProfissional.id) { continue; }
                        label += a2.temperamento + ' ';
                    }
                }
                return label;
            }

            buildMotivacoesLabel(motivacoes: any[], selectedMotivacoesNames: string[]) {
                let label = String();
                for (let m1 of motivacoes) {
                    if (selectedMotivacoesNames.indexOf(m1.jobMotivacaoClassification) === -1) { continue; }
                    label += m1.motivacao + ' ';
                }
                return label;
            }

            // Called by UI conditions
            showUndefined(phase: number) {
                // if (phase === this.phase) { return false; }
                if (phase === 1) { return this.formLabels.temperamentoAreaIdeal.length === 0; }
                if (phase === 2) { return this.formLabels.temperamentoAreasPrincipais.length === 0; }
                if (phase === 3) { return this.formLabels.temperamentoAreasAlternativas.length === 0; }
                if (phase === 4) { return this.formLabels.comportamentoAreaIdeal.length === 0; }
                if (phase === 5) { return this.formLabels.comportamentoAreasPrincipais.length === 0; }
                if (phase === 6) { return this.formLabels.comportamentoAreasAlternativas.length === 0; }

                let isPristine = true;
                if (isPristine && this.formLabels.motivacoesPrincipais.length > 0) isPristine = false;
                if (isPristine && this.formLabels.motivacoesAlternativas != null && this.formLabels.motivacoesAlternativas.length > 0) isPristine = false;
                if (isPristine && this.formLabels.autoGerenciamento1 != null && this.formLabels.autoGerenciamento1.length > 0) isPristine = false;
                if (isPristine && this.formLabels.autoGerenciamento2 != null && this.formLabels.autoGerenciamento2.length > 0) isPristine = false;
                if (isPristine && this.formLabels.apogeo1 != null && this.formLabels.apogeo1.length > 0) isPristine = false;
                if (isPristine && this.formLabels.apogeo2 != null && this.formLabels.apogeo2.length > 0) isPristine = false;
                if (phase === 7 && this.phase !== 7) { return isPristine; }

                return false;
            }

            // --------------------------------------------------
            // --------------------------------------------------

        }
