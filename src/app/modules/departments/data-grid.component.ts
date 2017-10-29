import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { DepartmentComponent } from './department.component';
import { DataGridComponent } from '../../components';
import { DepartmentService } from './department.service';
import { Alert, Department } from '../../models';

@Component({
    selector: 'data-grid-departments',
    template: `<ng2-smart-table
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
    `,
    styleUrls: ['../../components/data-grid/data-grid.component.scss'],
    providers: [DepartmentService],
    encapsulation: ViewEncapsulation.None
})
export class DepartmentsDataGridComponent extends DataGridComponent {

    constructor(protected router: Router, protected service: DepartmentService) {
        super(router, service);
        this.baseUrl = '/jobs/department';
        this.labels.add = 'Adicionar Posição';
        this.settings.columns = {
            name: {
                title: 'Departamento', width: "70%", filter: false, editor: { type: 'textarea' }
            }
        };
    }

    newEntity = (rowData): Object => {
        return new Department(rowData.id, rowData.name, rowData.industry, rowData.clientId);
    }

}
