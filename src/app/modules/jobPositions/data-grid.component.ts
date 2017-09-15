import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { DataGridComponent, CheckboxComponent } from '../../components';
import { JobPositionService } from './jobPosition.service';
import { Alert, JobPosition } from '../../models';

@Component({
    selector: 'data-grid-job-positions',
    template: `<ng2-smart-table
    [settings]="settings"
    [source]="source"
    (create)="onCreate()"
    (edit)="onEdit($event)"
    (delete)="onDeleteConfirm($event)"></ng2-smart-table>
    `,
    styleUrls: ['../../components/data-grid/data-grid.component.scss'],
    providers: [JobPositionService],
    encapsulation: ViewEncapsulation.None
})
export class JobPositionsDataGridComponent extends DataGridComponent {

    constructor(protected router: Router, protected service: JobPositionService) {
        super(router, service);
        this.baseUrl = '/jobPositions/jobPosition';
        this.labels.update.success = 'Página atualizada com sucesso!';
        this.labels.delete.success = 'Página excluida com sucesso!';
        this.labels.delete.confirm = 'Deseja mesmo excluir essa página?';
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

}
