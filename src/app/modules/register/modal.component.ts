import { Component, Input, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AlertComponent, ModalComponent } from '../../components';
import { DistributorService } from './distributor.service';
import { Distributor } from '../../models';

@Component({
    selector: 'mm-distributor-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['../../app.component.scss']
})
export class DistributorModalComponent extends ModalComponent {

    constructor(protected fb: FormBuilder, protected service: DistributorService) {
        super(fb, service);
        this.defaultValues = { id: 0, client: '', active: true };
    }

    newEntity = (params): Object => {
        return new Distributor(params.id, params.client, params.email, params.document, params.name, params.enabled);
    }

    validate(value: any) {
        let o = value['client'];
        if (o === null || o === '' || o.length < 5) {
            this.alert.buildAlert(0, "O campo Frase requer ao menos 5 caracteres");
            return false;
        }
        return true;
    }
}
