import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { DataGridComponent, CheckboxComponent } from '../../components';
import { SurveyService } from './survey.service';
import { Alert, Survey } from '../../models';

@Component({
    selector: 'data-grid-surveys',
    template: `<ng2-smart-table
        [settings]="settings"
        [source]="source"
        (create)="onCreate($event)"
        (edit)="onEdit($event)"
        (delete)="onDeleteConfirm($event)"></ng2-smart-table>
    `,
    styleUrls: ['../../components/data-grid/data-grid.component.scss'],
    providers: [SurveyService],
    encapsulation: ViewEncapsulation.None
})
export class SurveysDataGridComponent extends DataGridComponent {

    constructor(protected router: Router, protected service: SurveyService) {
        super(router, service);
        this.baseUrl = '/surveys/survey';
        // this.labels.update.success = 'Página atualizada com sucesso!';
        // this.labels.delete.success = 'Página excluida com sucesso!';
        // this.labels.delete.confirm = 'Deseja mesmo excluir essa página?';
        this.labels.add = 'Adicionar Página';
        this.settings.columns = {
            title: {
                title: 'Página', width: "70%", filter: false, editor: { type: 'textarea' }
            },
            active: {
                title: 'Ativo', type: 'custom', renderComponent: CheckboxComponent, filter: false,
                onComponentInitFunction: (instance: any) => { instance.saveStatus = this.saveStatus; }
            }
        };
    }

    newEntity = (rowData): Object => {
        return new Survey(rowData.id, rowData.title, rowData.pageOrder, rowData.active);
    }

    saveStatus = (rowData, flagName, status): void => {
        console.log(JSON.stringify(rowData));
        if (rowData.active && !status) {
            this.alert.buildAlert(0, "Operação não permitida! Você precisa ativar um outro questionário para desativar esse.");

            for (let i = 0; i < this.source['data'].length; i++) {
                let newS = { id: rowData.id, active: rowData.active, title: rowData.title };
                this.source.update(this.source['data'][i], this.source['data'][i]);
            }

            return;
        }

        if (flagName !== undefined && status !== undefined)
            rowData[flagName] = status;

        this.apiService.setStatus(rowData.id)
            .then(data => {
                this.source.update(rowData, this.newEntity(data));
                this.source.refresh();
                this.alert.buildAlert(1, this.labels.update.success);
                this.reload();

            }, error => { this.alert.handleResponseError(error); });
    }
}
