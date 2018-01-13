import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { TemplateModalComponent } from './modal.component';
import { LocalDataSource } from 'ng2-smart-table';
import { DataGridComponent, CheckboxComponent } from '../../components';
import { TemplateService } from './template.service';
import { Template } from '../../models';
import { AuthService } from '../../auth';
import { ClientService } from '../clients';

@Component({
    selector: 'data-grid-templates',
    template: `<ng2-smart-table
    [settings]="settings"
    [source]="source"
    (create)="onCreate($event)"
    (edit)="onSave($event)"></ng2-smart-table>
    <div *ngIf="this.empty">
    <br />
    <a (click)="this.reload()" href="javascript:void(0)"> Tentar novamente</a>
    <img *ngIf="this.reloading" src="images/refresh.svg" width="16" height="16" />
    </div>
    <mm-template-modal></mm-template-modal>
    `,
    styleUrls: ['./modal.component.scss', '../../components/data-grid/data-grid.component.scss'],
    providers: [TemplateService, ClientService],
    encapsulation: ViewEncapsulation.None
})
export class TemplatesDataGridComponent extends DataGridComponent {

    clients: any[];
    data: any[];

    constructor(protected router: Router, protected service: TemplateService, protected authService: AuthService, protected clientService: ClientService) {
        super(router, service);
        this.baseUrl = '/mail/template';
        this.labels.add = 'Adicionar Template';
        this.settings.columns = {
        };
        if(this.authService.isAdminOrDistributor()) {
            this.settings.columns.description = { title: 'Descrição', width: "60%", filter: false, editor: { type: 'textarea' }};
            this.settings.columns.clientName = { title: 'Cliente', width: '40%', filter: false };
        } else {
            this.settings.columns.description = { title: 'Descrição', width: "100%", filter: false, editor: { type: 'textarea' }};
        }
        this.settings.actions.add = false;
        // this.settings.actions.edit = false;
        this.settings.actions.delete = false;
        this.settings.hideSubHeader = true;
    }

    async reload() {
        if(this.reloading) { return; }
        this.reloading = true;
        this.data = await this.apiService.getResult();
        if(!this.clients) { this.clients = await this.clientService.getResult(); }
        this.refreshClientName();
        // this.empty = this.data === undefined || this.data.length === 0;
        // this.source = new LocalDataSource(this.data);
        // this.reloading = false;
    }

    refreshClientName() {
        for (let obj of this.data) {
            let foundArray = this.clients.filter(c => c.id === obj.clientId);
            if(foundArray && foundArray[0]) obj.clientName = foundArray[0].name;
        }
        this.empty = this.data === undefined || this.data.length === 0;
        this.source = new LocalDataSource(this.data);
        this.reloading = false;
    }

    newEntity = (rowData): Object => {
        return new Template(rowData.id, rowData.name, rowData.description, rowData.subject, rowData.senderName, rowData.senderEmail, rowData.mailTo, rowData.content, rowData.clientId, rowData.clientName);
    }

    // Modal editor
    @ViewChild(TemplateModalComponent)
    modalComponent: TemplateModalComponent;

    onCreate(event: any) {
        this.alert.obj.status = false;
        this.modalComponent.type = 'create';
        this.modalComponent.openModal(this, event, 'modal-xl', true);
    }

    onSave(event: any) {
        // console.log('OnSave ' + event);
        this.modalComponent.type = 'edit';
        this.modalComponent.openModal(this, event, 'modal-xl', true);
    }
}
