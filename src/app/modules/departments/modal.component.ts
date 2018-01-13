import { Component, Input, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AlertComponent, ModalComponent } from '../../components';
import { DepartmentService } from './department.service';
import { Department, Industry } from '../../models';
import { IndustryService, IndustryModalComponent } from '../industries';
import { AuthService } from '../../auth';

declare var jquery: any;
declare var $: any;

@Component({
    selector: 'mm-department-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['../../app.component.scss']
})
export class DepartmentModalComponent extends ModalComponent {

    @ViewChild(IndustryModalComponent)
    industryModal: IndustryModalComponent;

    industries: any[];
    clients: any[];

    constructor(protected fb: FormBuilder, public authService: AuthService, protected service: DepartmentService, protected industryService: IndustryService) {
        super(fb, service);
        this.defaultValues = { id: 0, name: '', industry: {}, clientId: '' };
        this.industryService.objectEmitter.subscribe((data) => {
            if(this.dataGrid !== undefined) this.dataGrid.ngOnInit();
            this.reloadIndustries();
            this.object.industry = data;
        });
    }

    async ngOnInit() {
        super.ngOnInit();
        this.clients = this.dataGrid && this.dataGrid.clients ? this.dataGrid.clients : [];
    }

    open(size: string) {
        this.clients = this.dataGrid && this.dataGrid.clients ? this.dataGrid.clients : [];
         $('.modal-dialog').removeClass('modal-center');
        $('.modal-dialog').removeClass('modal-full');
        $('.modal-dialog').removeClass('modal-xl');
        $('.modal-dialog').removeClass('modal-lg');
        $('.modal-dialog').removeClass('modal-md');
        $('.modal-dialog').removeClass('modal-sm');
        super.open(size);
        $('.modal-dialog').addClass('modal-' + size);
        this.reloadIndustries();
    }

    async reloadIndustries() {
        this.industries = await this.industryService.getResult();
    }

    newEntity = (params): Object => {
        return new Department(params.id, params.name, params.industry, params.clientId);
    }

    validate(value: any) {
        if (!value['name'] || value['name'].length < 3) {
            this.alert.buildAlert(0, 'O nome do departamento requer ao menos 3 caracteres');
            return false;
        }
        // console.log('VALIDATE - INDUSTRY: ' + JSON.stringify(value['industry']));
        if (!value['industry'] || Object.keys(value['industry']).length === 0) {
            this.alert.buildAlert(0, 'O ramo precisa ser escolhido');
            return false;
        }
        return true;
    }

    industryCompareFn(d1: any, d2: any): boolean {
        return d1 && d2 ? d1.id === d2.id : d1 === d2;
    }

    addIndustry(event: any) {
        this.alert.obj.status = false;
        this.industryModal.type = 'create';
        this.industryModal.openModal(this, event, 'lg', false);
    }

    preUpdateGrid(object: any) {
        const result = this.clients.filter(c => c.id === object.clientId);
        if(result && result[0]) { object.clientName = result[0].name; }
    }

    preSave(value: any) {
        if(!value.clientId || !this.authService.isAdminOrDistributor()) {
            delete value.clientId;
        }
    }

}
