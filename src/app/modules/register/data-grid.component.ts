import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { DistributorModalComponent } from './modal.component';
import { DataGridComponent, CheckboxComponent, DisabledCheckboxComponent } from '../../components';
import { DistributorService } from './distributor.service';
import { Distributor } from '../../models';

@Component({
    selector: 'data-grid-distributors',
    template: `<a (click)="showDisconts()">xxxxxxxx</a><ng2-smart-table
        [settings]="settings"
        [source]="source"
        (create)="onCreate($event)"
        (edit)="onEdit($event)"
        (delete)="onDeleteConfirm($event)"></ng2-smart-table>
        <div *ngIf="this.empty">
            <br />
            <a (click)="this.reload()" href="javascript:void(0)"> Tentar novamente</a>
            <img *ngIf="this.reloading" src="images/refresh.svg" width="16" height="16" />
        </div>
        <mm-distributor-modal></mm-distributor-modal>
        `,
    styleUrls: ['../../components/data-grid/data-grid.component.scss'],
    providers: [DistributorService],
    encapsulation: ViewEncapsulation.None
})
export class DistributorsDataGridComponent extends DataGridComponent {

    constructor(protected router: Router, protected service: DistributorService) {
        super(router, service);
        this.baseUrl = '/register/distributor';
        this.labels.add = 'Adicionar Frase';
        this.settings.columns = {
            // id: {
            //     title: 'Id', width: "45%", filter: false, editor: { type: 'textarea' }
            // },
            name: {
                title: 'Nome', width: "45%", filter: false, editor: { type: 'textarea' }
            },
            email: {
                title: 'E-mail', width: "45%", filter: false, editor: { type: 'textarea' }
            },
            enabled: {
                title: 'Facilitador', type: 'custom', valuePrepareFunction: 'custom', width: '10%', renderComponent: DisabledCheckboxComponent, filter: false
            },
            actions: {
                title: '', width: "45%", filter: false
            }
        };
    }

    newEntity = (rowData): Object => {
        return new Distributor(rowData.id, rowData.client, rowData.email, rowData.document, rowData.name, rowData.roles, rowData.phones, rowData.addresses, rowData.distributorType, rowData.enabled);
    }

    // Modal editor
    @ViewChild(DistributorModalComponent)
    modalComponent: DistributorModalComponent;

    showDisconts() {
        this.modalComponent.type = 'edit';
        this.modalComponent.openModal(this, event, 'lg', true);
    }

}
