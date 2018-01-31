import { Component, ViewChild, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DistributorService } from './distributor.service';
import { Distributor } from '../../models';
import { EditComponent } from '../../components';

@Component({
    selector: 'app-distributors',
    templateUrl: './distributor.component.html',
    styleUrls: ['../../app.component.scss'],
    providers: [DistributorService]
})
export class DistributorComponent extends EditComponent {

    constructor(protected route: ActivatedRoute, protected router: Router,
        protected service: DistributorService) {
        super(route, router, service);
        this.listPath = '/register/distributor';
        this.object = this.newEntity({ id: 0, client: '', email: '', document: '', name: '', roles: [], phones: [], addresses: [], distributorType: '', enabled: true });
    }

    newEntity(serverObject: any) {
        return new Distributor(serverObject.id, serverObject.client, serverObject.email, serverObject.document, serverObject.name, serverObject.roles, serverObject.phones, serverObject.addresses, serverObject.distributorType, serverObject.enabled);
    }

    newPhone() {

    }

    // newChild(value: number, text: string) {
    //     return new Question(value, text);
    // }

    newAddress() {

    }

}
