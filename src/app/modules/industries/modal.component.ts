import { Component, Input, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AlertComponent, ModalComponent } from '../../components';
import { IndustryService } from './industry.service';
import { Industry } from '../../models';
import { AuthService } from '../../auth';

@Component({
    selector: 'mm-industry-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['../../app.component.scss']
})
export class IndustryModalComponent extends ModalComponent {

    clients: any[];

    constructor(protected fb: FormBuilder, protected service: IndustryService, public authService: AuthService) {
        super(fb, service);
        this.defaultValues = { id: 0, name: '', clientId: 0 };
    }

    async ngOnInit() {
        super.ngOnInit();
        this.clients = this.dataGrid && this.dataGrid.clients ? this.dataGrid.clients : [];
    }

    newEntity = (params): Object => {
        return new Industry(params.id, params.name, params.clientId);
    }

    validate(value: any) {
        if (!value['name'] || value['name'].length < 3) {
            this.alert.buildAlert(0, 'O nome do ramo requer ao menos 3 caracteres');
            return false;
        }

        return true;
    }

    open(size: string) {
        this.clients = this.dataGrid && this.dataGrid.clients ? this.dataGrid.clients : [];
        super.open(size);
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
