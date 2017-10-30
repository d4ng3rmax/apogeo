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
    <div *ngIf="this.empty">
        <br />
        <a (click)="this.reload()" href="javascript:void(0)"> Tentar novamente</a>
        <img *ngIf="this.reloading" src="images/refresh.svg" width="16" height="16" />
    </div>
    `,
    styleUrls: ['../../components/data-grid/data-grid.component.scss'],
    providers: [PageService],
    encapsulation: ViewEncapsulation.None
})
export class PagesDataGridComponent extends DataGridComponent {

    constructor(protected router: Router, protected service: PageService) {
        super(router, service);
        this.baseUrl = '/surveys/page';
        this.labels.add = 'Adicionar Página';
        this.settings.columns = {
            title: { title: 'Título', width: "90%", filter: false, editor: { type: 'textarea' } },
            active: {
                title: 'Ativo', type: 'custom', valuePrepareFunction: 'custom', width: '10%', renderComponent: CheckboxComponent, filter: false,
                onComponentInitFunction: (instance: any) => { instance.toggleActive = this.toggleActive; }
            }
        };
    }

    newEntity = (rowData): Object => {
      return new Page(rowData.id, rowData.title, rowData.questionOrder, rowData.active);
    }

}
