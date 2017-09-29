import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { JobPositionModalComponent } from './modal.component';
import { DataGridComponent, CheckboxComponent } from '../../components';
import { JobPositionService } from './jobPosition.service';
import { Alert, JobPosition } from '../../models';

@Component({
    selector: 'data-grid-job-positions',
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
    <mm-job-position-modal></mm-job-position-modal>
    `,
    styleUrls: ['../../components/data-grid/data-grid.component.scss'],
    providers: [JobPositionService],
    encapsulation: ViewEncapsulation.None
})
export class JobPositionsDataGridComponent extends DataGridComponent {

    constructor(protected router: Router, protected service: JobPositionService) {
        super(router, service);
        this.baseUrl = '/jobPositions/jobPosition';
        // this.labels.update.success = 'Página atualizada com sucesso!';
        // this.labels.delete.success = 'Página excluida com sucesso!';
        // this.labels.delete.confirm = 'Deseja mesmo excluir essa página?';
        this.labels.add = 'Adicionar Posição';
        this.settings.columns = {
            title: {
                title: 'Posição', width: "70%", filter: false, editor: { type: 'textarea' }
            },
            active: {
                title: 'Ativo', type: 'custom', renderComponent: CheckboxComponent, filter: false,
                onComponentInitFunction: (instance: any) => { instance.saveStatus = this.saveStatus; }
            }
        };
    }

    newEntity = (rowData): Object => {
        return new JobPosition(rowData.id, rowData.title, rowData.pageOrder, rowData.active);
    }

    // Modal editor
    @ViewChild(JobPositionModalComponent)
    modalComponent: JobPositionModalComponent;

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
