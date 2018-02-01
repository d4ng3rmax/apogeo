import { Component, ViewChild, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DistributorService } from './distributor.service';
import { Distributor, DistributorAddress, DistributorPhone } from '../../models';
import { EditComponent } from '../../components';

@Component({
    selector: 'app-distributors',
    templateUrl: './distributor.component.html',
    styleUrls: ['../../app.component.scss'],
    providers: [DistributorService]
})
export class DistributorComponent extends EditComponent {

    address: any;

    constructor(protected route: ActivatedRoute, protected router: Router,
        protected service: DistributorService) {
        super(route, router, service);
        this.listPath = '/register/distributor/list';
        this.address = [
            this.newAddress({ id: 0, addressType: '', street: '', number: '', other: '', area: '', zipCode: '', city: '', state: '' }),
            this.newAddress({ id: 0, addressType: '', street: '', number: '', other: '', area: '', zipCode: '', city: '', state: '' }),
            this.newAddress({ id: 0, addressType: '', street: '', number: '', other: '', area: '', zipCode: '', city: '', state: '' })
        ];
        this.object = this.newEntity({ id: 0, client: '', email: '', document: '', name: '', roles: [], phones: [{}, {}, {}], addresses: [this.address], distributorType: '', enabled: true });
    }

    newEntity(serverObject: any) {
        return new Distributor(serverObject.id, serverObject.client, serverObject.email, serverObject.document, serverObject.name, serverObject.roles, serverObject.phones, serverObject.addresses, serverObject.distributorType, serverObject.enabled);
    }

    newAddress(val: any) {
        return new DistributorAddress(val.id, val.addressType, val.street, val.number, val.other, val.area, val.zipCode, val.city, val.state);
    }

}
