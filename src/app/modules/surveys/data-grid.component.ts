import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { DataGridComponent, CheckboxComponent } from '../../components';
import { SurveyService } from './survey.service';
import { Alert, Survey } from '../../models';

@Component({
    selector: 'data-grid-surveys',
    template: `<ng2-smart-table
    [settings]="settings"
    [source]="source"
    (create)="onCreate()"
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
        this.labels.update.success = 'Página atualizada com sucesso!';
        this.labels.delete.success = 'Página excluida com sucesso!';
        this.labels.delete.confirm = 'Deseja mesmo excluir essa página?';
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

    saveStatus = (rowData) => {
        for (let i = 0; i < this.source['data'].length; i++) {
            let newS = { id: rowData.id, active: rowData.active, title: rowData.title };
            // source, new value
            this.source.update(this.source['data'][i], this.source['data'][i]);
        }

        this.alert.buildAlert(0, "Operação não permitida! Você precisa ativar um outro questionário para desativar esse.");

        if (rowData.active === false) {
            if (window.confirm('Apenas um questionário pode estar ativo ao mesmo tempo. Ao ativar este questionário, o anterior será inativado. Deseja continuar?')) {
                this.service.setStatus(rowData.id)
                    .then(data => {
                        this.alert.buildAlert(1, "Questinário salvo com sucesso!");


                        for (let i = 0; i < this.source['data'].length; i++) {

                            if (this.source['data'][i].id != rowData.id) {
                                let newS1 = { id: this.source['data'][i].id, active: false, title: this.source['data'][i].title };
                                this.source.update(this.source['data'][i], newS1);
                            }
                            else {
                                let newS2 = { id: rowData.id, active: true, title: rowData.title };
                                this.source.update(this.source['data'][i], newS2);
                            }
                        }
                        this.source.reset();
                        this.source.refresh();

                    }, error => this.alert.buildAlert(0, JSON.parse(error._body).errorMessage));

            } else {
                return false;
            }
        }
    }

}
