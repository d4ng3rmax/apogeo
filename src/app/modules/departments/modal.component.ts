import { Component, Input, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AlertComponent, ModalComponent } from '../../components';
import { DepartmentService } from './department.service';
import { Department, Industry } from '../../models';
import { IndustryService, IndustryModalComponent } from '../industries';

@Component({
    selector: 'mm-department-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['../../app.component.scss']
})
export class DepartmentModalComponent extends ModalComponent {

    @ViewChild(IndustryModalComponent)
    industryModal: IndustryModalComponent;

    industries: any[];

    constructor(protected fb: FormBuilder, protected service: DepartmentService, protected industryService: IndustryService) {
        super(fb, service);
        this.defaultValues = { id: 0, name: '', industry: {}, clientId: '' };
        this.industryService.objectEmitter.subscribe((data) => {
            if(this.dataGrid !== undefined) this.dataGrid.ngOnInit();
            this.reloadIndustries();
            this.object.industry = data;
        });
    }

    // test() {
    //     console.log('this.object.industry = ' + JSON.stringify(this.object.industry));
    //     console.log('this.fb.control["industry"] = ' + JSON.stringify(this.fb.control["industry"]));
    // }

    async ngOnInit() {
        super.ngOnInit();
        this.reloadIndustries();
    }

    async reloadIndustries() {
        this.industries = await this.industryService.getResult();
    }

    newEntity = (params): Object => {
        return new Department(params.id, params.name, params.industry, params.clientId);
    }

    validate(value: any) {
        let o = value['name'];
        if (o === null || o === '' || o.length < 3) {
            this.alert.buildAlert(0, "O nome do departamento requer ao menos 3 caracteres");
            return false;
        }
        // if(this.object.clientId == 0) delete this.object.clientId;
        return true;
    }

    // edit(value: any): void {
    //     console.log('Editing ' + JSON.stringify(value));
    //     super.edit(value);
    // }

    industryCompareFn(d1: any, d2: any): boolean {
        return d1 && d2 ? d1.id === d2.id : d1 === d2;
    }

    addIndustry(event: any) {
        this.alert.obj.status = false;
        this.industryModal.type = 'create';
        this.industryModal.openModal(this, event, 'lg', false);
    }
}
