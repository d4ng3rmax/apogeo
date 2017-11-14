import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { JobPositionComponent } from './jobPosition.component';
import { DataGridComponent } from '../../components';
import { JobPositionService } from './jobPosition.service';
import { Alert, JobPosition } from '../../models';

@Component({
    selector: 'data-grid-job-positions',
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
    providers: [JobPositionService],
    encapsulation: ViewEncapsulation.None
})
export class JobPositionsDataGridComponent extends DataGridComponent {

    constructor(protected router: Router, protected service: JobPositionService) {
        super(router, service);
        this.baseUrl = '/jobs/jobPosition';
        this.labels.add = 'Adicionar Posição';
        this.settings.columns = {
            name: {
                title: 'Posição', width: "100%", filter: false, editor: { type: 'textarea' }
            }
        };
    }

    newEntity = (rowData): Object => {
        return new JobPosition(rowData.id, rowData.name, rowData.department, rowData.clientId, rowData.areaPrincipal, rowData.outrasAreasPrincipais, rowData.outrasAreasAlternativas, rowData.abordagemPrincipal, rowData.outrasAbordagensPrincipais, rowData.outrasAbordagensAlternativas, rowData.areaNome, rowData.temperamento, rowData.maleUrl, rowData.femaleUrl);
    }

}
