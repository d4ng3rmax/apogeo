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
    `,
    styleUrls: ['../../components/data-grid/data-grid.component.scss'],
    providers: [SolutionService],
    encapsulation: ViewEncapsulation.None
})
export class SolutionsDataGridComponent extends DataGridComponent {

    constructor(protected router: Router, protected service: SolutionService) {
        super(router, service);
        this.baseUrl = '/solutions/solution';
        this.labels.update.success = 'Solução atualizada com sucesso!';
        this.labels.delete.success = 'Solução excluida com sucesso!';
        this.labels.delete.confirm = 'Deseja mesmo excluir essa solução?';
        this.labels.add = 'Adicionar Solução';
        this.settings.columns = {
            title: { title: 'Título', editor: { type: 'textarea' }, width: "20%", filter: false },
            description: { title: 'Descrição', width: "30%", editor: { type: 'textarea' }, filter: false },
            hasJobPosition: {
                title: 'Possui Cargos', type: 'custom', renderComponent: DisabledCheckboxComponent, filter: false,
                onComponentInitFunction: (instance: any) => { instance.flagName = 'hasJobPosition'; }
            },
            cortesia: {
                title: 'Cortesia', type: 'custom', renderComponent: DisabledCheckboxComponent, filter: false,
                onComponentInitFunction: (instance: any) => { instance.flagName = 'cortesia'; }
            },
            active: {
                title: 'Ativo', type: 'custom', renderComponent: CheckboxComponent, filter: false,
                onComponentInitFunction: (instance: any) => {
                    instance.saveStatus = this.saveStatus;
                }
            }
        };
    }

    newEntity = (rowData): Object => {
        return new Solution(rowData.id, rowData.title, rowData.description, rowData.hasJobPosition, rowData.valor, rowData.cortesia, rowData.resultOrder, rowData.active);
    }

}
