import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { DistributorModalComponent } from './modal.component';
import { DataGridComponent, CheckboxComponent } from '../../components';
import { DistributorService } from './distributor.service';
import { Distributor } from '../../models';

@Component({
    selector: 'data-grid-distributors',
    template: `<ng2-smart-table
        [settings]="settings"
        [source]="source"
        (create)="onCreate($event)"
        (edit)="onSave($event)"
        (delete)="onDeleteConfirm($event)"></ng2-smart-table>
        <div *ngIf="this.empty">
            <br />
            <a (click)="this.reload()" href="javascript:void(0)"> Tentar novamente</a>
            <img *ngIf="this.reloading" src="images/refresh.svg" width="16" height="16" />
        </div>
        <mm-question-modal></mm-question-modal>
        `,
    styleUrls: ['../../components/data-grid/data-grid.component.scss'],
    providers: [DistributorService],
    encapsulation: ViewEncapsulation.None
})
export class DistributorDataGridComponent extends DataGridComponent {

    constructor(protected router: Router, protected service: DistributorService) {
        super(router, service);
        this.baseUrl = '/surveys/question';
        this.labels.add = 'Adicionar Frase';
        this.settings.columns = {
            question: {
                title: 'Nome', width: "90%", filter: false, editor: { type: 'textarea' }
            },
            active: {
                title: 'Ativo', type: 'custom', valuePrepareFunction: 'custom', width: '10%', renderComponent: CheckboxComponent, filter: false,
                onComponentInitFunction: (instance: any) => { instance.toggleActive = this.toggleActive; }
            }
        };
    }

    newEntity = (rowData): Object => {
        return new Distributor(rowData.id, rowData.client, rowData.email, rowData.document, rowData.name, rowData.enabled);
    }

    // Modal editor
    @ViewChild(DistributorModalComponent)
    modalComponent: DistributorModalComponent;

    onCreate(event: any) {
        this.alert.obj.status = false;
        this.modalComponent.type = 'create';
        this.modalComponent.openModal(this, event, 'lg', true);
    }

    onSave(event: any) {
        this.modalComponent.type = 'edit';
        this.modalComponent.openModal(this, event, 'lg', true);
    }
}
