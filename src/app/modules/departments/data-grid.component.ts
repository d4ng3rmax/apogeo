import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { DepartmentModalComponent } from './modal.component';
import { DataGridComponent } from '../../components';
import { DepartmentService } from './department.service';
import { Alert, Department } from '../../models';
import { IndustryService } from '../industries';
import { AuthService } from '../../auth';
import { ClientService } from '../clients';
import { LocalDataSource } from 'ng2-smart-table';

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
    providers: [DepartmentService, IndustryService, ClientService],
    encapsulation: ViewEncapsulation.None
})
export class DepartmentsDataGridComponent extends DataGridComponent {

    clients: any[];

    constructor(protected router: Router, protected service: DepartmentService, protected authService: AuthService, protected clientService: ClientService) {
        super(router, service);
        this.baseUrl = '/jobs/department';
        this.labels.add = 'Adicionar Departamento';
        this.settings.columns = {
            name: {
                name: 'Departamento', width: "100%", filter: false, editor: { type: 'textarea' }
            }
        };
        if(this.authService.isAdminOrDistributor()) {
            this.settings.columns.clientName = { title: 'Cliente', width: '10%', filter: false };
        }
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

    async reload() {
        if(this.reloading) { return; }
        this.reloading = true;
        let result:any[] = await this.apiService.getResult();
        this.clients = await this.clientService.getResult();
        for (let obj of result) {
            let foundArray = this.clients.filter(c => c.id === obj.clientId);
            if(foundArray && foundArray[0]) {
                obj.clientName = foundArray[0].name;
            } else {
                obj.clientName = 'Público';
            }
        }
        this.empty = result === undefined || result.length === 0;
        this.source = new LocalDataSource(result);
        this.reloading = false;
    }
}
