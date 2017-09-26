import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { DataGridComponent, CheckboxComponent } from '../../components';
import { PageService } from './page.service';
import { Page } from '../../models';

@Component({
    selector: 'data-grid-pages',
    template: `<ng2-smart-table
    [settings]="settings"
    [source]="source"
    (create)="onCreate($event)"
    (edit)="onEdit($event)"
    (delete)="onDeleteConfirm($event)"></ng2-smart-table>
    `,
    styleUrls: ['../../components/data-grid/data-grid.component.scss'],
    providers: [PageService],
    encapsulation: ViewEncapsulation.None
})
export class PagesDataGridComponent extends DataGridComponent {

    constructor(protected router: Router, protected service: PageService) {
        super(router, service);
        this.baseUrl = '/surveys/page';
        // this.labels.update.success = 'Página atualizado com sucesso!';
        // this.labels.delete.success = 'Página excluida com sucesso!';
        // this.labels.delete.confirm = 'Deseja mesmo excluir esta página?';
        this.labels.add = 'Adicionar Página';
        this.settings.columns = {
            title: { title: 'Título', width: "70%", filter: false, editor: { type: 'textarea' } },
            active: { title: 'Ativo', type: 'custom', renderComponent: CheckboxComponent, filter: false,
                onComponentInitFunction: (instance: any) => { instance.saveStatus = this.saveStatus; }
            }
        };
    }

    newEntity = (rowData): Object => {
      return new Page(rowData.id, rowData.title, rowData.questionOrder, rowData.active);
    }

}
