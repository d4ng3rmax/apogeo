import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { DataGridComponent, CheckboxComponent, DisabledCheckboxComponent } from '../../components';
import { SolutionService } from './solution.service';
import { Solution } from '../../models';

@Component({
    selector: 'data-grid-solutions',
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
    providers: [SolutionService],
    encapsulation: ViewEncapsulation.None
})
export class SolutionsDataGridComponent extends DataGridComponent {

    constructor(protected router: Router, protected service: SolutionService) {
        super(router, service);
        this.baseUrl = '/solutions/solution';
        // this.labels.update.success = 'Solução atualizada com sucesso!';
        // this.labels.delete.success = 'Solução excluida com sucesso!';
        // this.labels.delete.confirm = 'Deseja mesmo excluir essa solução?';
        this.labels.add = 'Adicionar Solução';
        this.settings.columns = {
            title: { title: 'Título', editor: { type: 'textarea' }, width: '20%', filter: false },
            description: { title: 'Descrição', width: '35%', editor: { type: 'textarea' }, filter: false },
            valor: { title: 'Valor', width: '5%', editor: { type: 'textarea' }, filter: false },
            hasJobPosition: {
                title: 'Possui Cargos', type: 'custom', width: '5%', renderComponent: DisabledCheckboxComponent, filter: false,
                onComponentInitFunction: (instance: any) => { instance.flagName = 'hasJobPosition'; }
            },
            cortesia: {
                title: 'Cortesia', type: 'custom', width: '5%', renderComponent: DisabledCheckboxComponent, filter: false,
                onComponentInitFunction: (instance: any) => { instance.flagName = 'cortesia'; }
            },
            active: {
                title: 'Ativo', type: 'custom', valuePrepareFunction: 'custom', width: '5%', renderComponent: CheckboxComponent, filter: false,
                onComponentInitFunction: (instance: any) => { instance.toggleActive = this.toggleActive; }
            }
        };
    }

    newEntity = (rowData): Object => {
        return new Solution(rowData.id, rowData.title, rowData.description, rowData.hasJobPosition, rowData.valor, rowData.cortesia, rowData.resultOrder, rowData.active);
    }

}
