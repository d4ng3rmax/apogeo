import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { DepartmentModalComponent } from './modal.component';
import { DataGridComponent } from '../../components';
import { DepartmentService } from './department.service';
import { Alert, Department } from '../../models';
import { IndustryService } from '../industries';

@Component({
    selector: 'data-grid-departments',
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
        <mm-department-modal></mm-department-modal>
    `,
    styleUrls: ['../../components/data-grid/data-grid.component.scss'],
    providers: [DepartmentService, IndustryService],
    encapsulation: ViewEncapsulation.None
})
export class DepartmentsDataGridComponent extends DataGridComponent {

    constructor(protected router: Router, protected service: DepartmentService) {
        super(router, service);
        this.baseUrl = '/jobs/department';
        this.labels.add = 'Adicionar Departamento';
        this.settings.columns = {
            name: {
                name: 'Departamento', width: "100%", filter: false, editor: { type: 'textarea' }
            }
        };
    }

    newEntity = (rowData): Object => {
        return new Department(rowData.id, rowData.name, rowData.industry, rowData.clientId);
    }

    // Modal editor
    @ViewChild(DepartmentModalComponent)
    modalComponent: DepartmentModalComponent;

    onCreate(event: any) {
        this.alert.obj.status = false;
        this.modalComponent.type = 'create';
        this.modalComponent.openModal(this, event, 'lg', true);
    }

    onSave(event: any) {
        this.modalComponent.type = 'edit';
        console.log('Opening ' + JSON.stringify(event.data));
        this.modalComponent.openModal(this, event, 'lg', true);
    }
}