import { Component, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ModalComponent } from '../../components';
import { DistributorService } from './distributor.service';
import { Distributor } from '../../models';
import { AuthService } from '../../auth';

@Component({
    selector: 'mm-distributor-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})
export class DistributorModalComponent extends ModalComponent{

    constructor(protected fb: FormBuilder, protected service: DistributorService, public authService: AuthService) {
        super(fb, service);
        this.defaultValues = { id: 0, client: '', email: '', document: '', name: '', roles: [], phones: [], addresses: [], distributorType: '', enabled: true };
    }

    newEntity = (params): Object => {
        return new Distributor(params.id, params.client, params.email, params.document, params.name, params.roles, params.phones, params.addresses, params.distributorType, params.enabled);
    }

    validate(value: any) {
        let o = value['name'];
        if (o === null || o === '' || o.length < 5) {
            this.alert.buildAlert(0, "O campo nome requer ao menos 5 caracteres");
            return false;
        }
        return true;
    }

    open(size: string) {
        this.alert.reset();
        this.modal.open('modal-xl');
    }
}
