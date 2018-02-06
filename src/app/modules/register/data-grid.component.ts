import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { DistributorModalComponent } from './modal.component';
import { DataGridComponent, CheckboxComponent, DisabledCheckboxComponent, linkButton } from '../../components';
import { DistributorService } from './distributor.service';
import { DiscountsService } from './discounts.service';
import { Distributor } from '../../models';

@Component({
    selector: 'data-grid-distributors',
    template: `<ng2-smart-table
        [settings]="settings"
        [source]="source"
        (create)="onCreate($event)"
        (edit)="onEdit($event)"
        (custom)="showDisconts($event)"
        (delete)="onDeleteConfirm($event)"></ng2-smart-table>
        <div *ngIf="this.empty">
            <br />
            <a (click)="this.reload()" href="javascript:void(0)"> Tentar novamente</a>
            <img *ngIf="this.reloading" src="images/refresh.svg" width="16" height="16" />
        </div>
        <mm-distributor-modal></mm-distributor-modal>
        `,
    styleUrls: ['../../components/data-grid/data-grid.component.scss'],
    providers: [DistributorService, DiscountsService],
    encapsulation: ViewEncapsulation.None
})
export class DistributorsDataGridComponent extends DataGridComponent {

    discount: any[];

    constructor(protected router: Router, protected service: DistributorService, protected serviceDisc: DiscountsService) {

        super(router, service);
        this.baseUrl = '/register/distributor';
        this.labels.add = 'Adicionar Distribuidor';
        this.settings.columns = {
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
                title: '', type: 'custom', valuePrepareFunction: 'custom', width: '10%', renderComponent: linkButton, filter: false,
                onComponentInitFunction: (instance: any) => { instance.showDisconts = this.showDisconts }
            }
            // },
            // actions2: {
            //     title: '', type: 'custom', width: '10%', renderComponent: linkButton, filter: false
            // }
        };
        this.settings.actions.custom = [
            {
                title: '<i class="fa fa-dollar"></i>', filter: false
            }
        ];
        this.settings.actions.add = false;
        // this.settings.actions.edit = false;
        this.settings.actions.delete = false;
        this.settings.hideSubHeader = true;

    }

    async ngOnInit() {
        const discount = await this.service.getSingleResultFromChild(261);
        this.discount = discount;
    }

    newEntity = (rowData): Object => {
        return new Distributor(rowData.id, rowData.client, rowData.email, rowData.document, rowData.name, rowData.roles, rowData.phones, rowData.addresses, rowData.distributorType, rowData.enabled);
    }

    // Modal editor
    @ViewChild(DistributorModalComponent)
        modalComponent: DistributorModalComponent;

    showDisconts(event: any) {
        //console.info( event );
        this.modalComponent.discount = this.discount;
        this.modalComponent.type = 'edit';
        this.modalComponent.openModal(this, event, 'modal-xl', false);
    }

}
