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
        <mm-distributor-modal></mm-distributor-modal>
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
            name: {
                title: 'Nome', width: "45%", filter: false, editor: { type: 'textarea' }
            },
            email: {
                title: 'E-mail', width: "45%", filter: false, editor: { type: 'textarea' }
            },
            active: {
                title: 'Facilitador', type: 'custom', valuePrepareFunction: 'custom', width: '10%', renderComponent: CheckboxComponent, filter: false,
                onComponentInitFunction: (instance: any) => { instance.toggleActive = this.toggleActive; }
            }
        };
    }

    newEntity = (rowData): Object => {
        return new Distributor(rowData.id, rowData.client, rowData.email, rowData.document, rowData.name, rowData.enabled);
    }

    toggleEnabled = (rowData): void => {
        if (rowData.active) {
            this.alert.buildAlert(0, "Você só poderá ter 1 questionário ativo por vez. Selecione um questionário inativo para desativar este.");

            for (let i = 0; i < this.source['data'].length; i++) {
                let newS = { id: rowData.id, active: rowData.active, title: rowData.title };
                this.source.update(this.source['data'][i], this.source['data'][i]);
            }

            return;
        }

        if (window.confirm("Você só poderá ter 1 questionário ativo por vez. Ao ativar este, o anterior será automaticamente inativado. Deseja continuar?")) {
            this.apiService.toggleActive(rowData.id)
                .then(data => {
                    // this.source.update(rowData, this.newEntity(data));
                    // this.source.refresh();
                    this.alert.buildAlert(1, this.labels.update.success);
                    this.reload();

                }, error => { this.alert.handleResponseError(error); this.reload(); });
        } else {
            // rowData.active = false;
            for (let i = 0; i < this.source['data'].length; i++) {
                let newS = { id: rowData.id, active: rowData.active, title: rowData.title };
                this.source.update(this.source['data'][i], this.source['data'][i]);
            }
        }
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
