import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { IndustryModalComponent } from './modal.component';
import { DataGridComponent } from '../../components';
import { IndustryService } from './industry.service';
import { Alert, Industry } from '../../models';

@Component({
    selector: 'data-grid-industries',
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
        <mm-industry-modal></mm-industry-modal>
    `,
    styleUrls: ['../../components/data-grid/data-grid.component.scss'],
    providers: [IndustryService],
    encapsulation: ViewEncapsulation.None
})
export class IndustriesDataGridComponent extends DataGridComponent {

    constructor(protected router: Router, protected service: IndustryService) {
        super(router, service);
        this.baseUrl = '/jobs/industry';
        this.labels.add = 'Adicionar Ramo';
        this.settings.columns = {
            name: {
                name: 'Ramo', width: "100%", filter: false, editor: { type: 'textarea' }
            }
        };
    }

    newEntity = (rowData): Object => {
        return new Industry(rowData.id, rowData.name, rowData.clientId);
    }

    // Modal editor
    @ViewChild(IndustryModalComponent)
    modalComponent: IndustryModalComponent;

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
