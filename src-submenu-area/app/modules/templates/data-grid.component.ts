import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { TemplateModalComponent } from './modal.component';
import { DataGridComponent, CheckboxComponent } from '../../components';
import { TemplateService } from './template.service';
import { Template } from '../../models';
import { AuthService } from '../../auth';

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
    styleUrls: ['../../components/data-grid/data-grid.component.scss'],
    providers: [TemplateService],
    encapsulation: ViewEncapsulation.None
})
export class TemplatesDataGridComponent extends DataGridComponent {

    constructor(protected router: Router, protected service: TemplateService, protected authService: AuthService) {
        super(router, service);
        this.baseUrl = '/mail/template';
        // this.labels.update.success = 'Template atualizado com sucesso!';
        // this.labels.delete.success = 'Template excluido com sucesso!';
        // this.labels.delete.confirm = 'Deseja mesmo excluir esse template?';
        this.labels.add = 'Adicionar Template';
        this.settings.columns = {
            name: {
                title: 'Nome', width: "20%", filter: false, editor: { type: 'textarea' }
            },
            description: {
                title: 'Descrição', width: "40%", filter: false, editor: { type: 'textarea' }
            },
            subject: {
                title: 'Assunto', width: "30%", filter: false, editor: { type: 'textarea' }
            }
        };
        if(this.authService.isAdmin() || this.authService.isDistributor()) {
            this.settings.columns.client = { title: 'Cliente', width: '10%', filter: false };
        }
        this.settings.actions.add = false;
        this.settings.actions.delete = false;
        this.settings.hideSubHeader = true;
    }

    newEntity = (rowData): Object => {
        return new Template(rowData.id, rowData.name, rowData.description, rowData.subject, rowData.senderName, rowData.senderEmail, rowData.content, rowData.clientId, rowData.clientName);
    }

    // Modal editor
    @ViewChild(TemplateModalComponent)
    modalComponent: TemplateModalComponent;

    onCreate(event: any) {
        this.alert.obj.status = false;
        this.modalComponent.type = 'create';
        this.modalComponent.openModal(this);
    }

    onSave(event: any) {
        this.modalComponent.type = 'edit';
        this.modalComponent.openModal(this, event);
    }
}
