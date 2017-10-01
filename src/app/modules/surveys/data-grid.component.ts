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
        <div *ngIf="this.empty">
            <br />
            <a (click)="this.reload()" href="javascript:void(0)"> Tentar novamente</a>
            <img *ngIf="this.reloading" src="images/refresh.svg" width="16" height="16" />
        </div>
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
            title: { title: 'Página', width: "70%", filter: false, editor: { type: 'textarea' } },
            active: {
                title: 'Ativo', type: 'custom', valuePrepareFunction: 'custom', width: '10%', renderComponent: CheckboxComponent, filter: false,
                onComponentInitFunction: (instance: any) => { instance.toggleActive = this.toggleActive; }
            }
        };
    }

    newEntity = (rowData): Object => {
        return new Survey(rowData.id, rowData.title, rowData.pageOrder, rowData.active);
    }

    toggleActive = (rowData): void => {
        if (rowData.active && !status) {
            this.alert.buildAlert(0, "Você só poderá ter 1 questionário ativo por vez. Selecione um questionário inativo para desativar este.");

            for (let i = 0; i < this.source['data'].length; i++) {
                let newS = { id: rowData.id, active: rowData.active, title: rowData.title };
                this.source.update(this.source['data'][i], this.source['data'][i]);
            }

            return;
        }

        if (window.confirm("Você só poderá ter 1 questionário ativo por vez. Ao ativar este, o anterior será automaticamente inativado. Deseja continuar?")) {
            this.apiService.toggleActive(rowData.id)
                .then(data => {
                    this.source.update(rowData, this.newEntity(data));
                    this.source.refresh();
                    this.alert.buildAlert(1, this.labels.update.success);
                    this.reload();

                }, error => { this.alert.handleResponseError(error); });
        } else {
            // rowData.active = false;
            for (let i = 0; i < this.source['data'].length; i++) {
                let newS = { id: rowData.id, active: rowData.active, title: rowData.title };
                this.source.update(this.source['data'][i], this.source['data'][i]);
            }
        }
    }

    // saveStatus = (rowData, flagName, status): void => {
    //     console.log(JSON.stringify(rowData));
    //     if (rowData.active && !status) {
    //         this.alert.buildAlert(0, "Você só poderá ter 1 questionário ativo por vez. Ao ativar este, o anterior será automaticamente inativado. Deseja continuar?");
    //
    //         for (let i = 0; i < this.source['data'].length; i++) {
    //             let newS = { id: rowData.id, active: rowData.active, title: rowData.title };
    //             this.source.update(this.source['data'][i], this.source['data'][i]);
    //         }
    //
    //         return;
    //     }
    //
    //     if (flagName !== undefined && status !== undefined)
    //         rowData[flagName] = status;
    //
    //     this.apiService.toggleActive(rowData.id)
    //         .then(data => {
    //             this.source.update(rowData, this.newEntity(data));
    //             this.source.refresh();
    //             this.alert.buildAlert(1, this.labels.update.success);
    //             this.reload();
    //
    //         }, error => { this.alert.handleResponseError(error); });
    // }
}
