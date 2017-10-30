import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ResultModalComponent } from './modal.component';
import { DataGridComponent, CheckboxComponent } from '../../components';
import { ResultService } from './result.service';
import { Result } from '../../models';

@Component({
    selector: 'data-grid-results',
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
        <mm-result-modal></mm-result-modal>
    `,
    styleUrls: ['../../components/data-grid/data-grid.component.scss'],
    providers: [ResultService],
    encapsulation: ViewEncapsulation.None
})
export class ResultsDataGridComponent extends DataGridComponent {

    constructor(protected router: Router, protected service: ResultService) {
        super(router, service);
        this.baseUrl = '/solutions/result';
        this.labels.add = 'Adicionar Resultado';
        this.settings.columns = {
            codigo: { title: 'Código', editor: { type: 'input' }, width: "15%", filter: false },
            description: { title: 'Descrição', editor: { type: 'textarea' }, width: "85%", filter: false },
            active: {
                title: 'Ativo', type: 'custom', valuePrepareFunction: 'custom', width: '10%', renderComponent: CheckboxComponent, filter: false,
                onComponentInitFunction: (instance: any) => { instance.toggleActive = this.toggleActive; }
            }
        };
    }

    newEntity = (rowData): Object => {
        return new Result(rowData.id, rowData.description, rowData.codigo, rowData.active);
    }

    // Modal editor
    @ViewChild(ResultModalComponent)
    modalComponent: ResultModalComponent;

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
