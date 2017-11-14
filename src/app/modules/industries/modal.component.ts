import { Component, Input, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AlertComponent, ModalComponent } from '../../components';
import { IndustryService } from './industry.service';
import { Industry } from '../../models';

@Component({
    selector: 'mm-industry-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['../../app.component.scss']
})
export class IndustryModalComponent extends ModalComponent {

    constructor(protected fb: FormBuilder, protected service: IndustryService) {
        super(fb, service);
        this.defaultValues = { id: 0, name: '', clientId: 0 };
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
}
