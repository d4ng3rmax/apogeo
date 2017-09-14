import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { AlertComponent, CheckboxComponent, DisabledCheckboxComponent } from '../../components';
import { ApiService } from '../base/api.service';

export class DataGridComponent implements OnInit {

    @Input('alert')
    alert: AlertComponent;
    baseUrl: string;
    source: LocalDataSource;
    statusActive: boolean = null;
    apiService: ApiService;
    filters: any = {};

    labels: any = {
        title: '',
        create: {
            success: 'Item criado com sucesso!'
        },
        update: {
            success: 'Item atualizado com sucesso!'
        },
        delete: {
            confirm: 'Deseja mesmo excluir esse item?',
            success: 'Item excluida com sucesso!'
        }
    }

    settings: any = {
        mode: 'external',
        add: {
            confirmCreate: true,
            addButtonContent: '<i class="fa fa-plus"><span>Adicionar ' + this.labels.title + '</span></i>',
            createButtonContent: '<i class="fa fa-check"><span>Criar</span></i>',
            cancelButtonContent: '<i class="fa fa-close"><span>Cancelar</span></i>',
        },
        edit: {
            confirmSave: true,
            editButtonContent: '<i class="fa fa-pencil"><span>Editar</span></i>',
            saveButtonContent: '<i class="fa fa-check"><span>Salvar</span></i>',
            cancelButtonContent: '<i class="fa fa-close"><span>Cancelar</span></i>',
        },
        delete: {
            confirmDelete: true,
            deleteButtonContent: '<i class="fa fa-close"><span>Excluir</span></i>',
        },
        noDataMessage: 'Nenhum registro encontrado',
        actions: {
            columnTitle: 'Ações',
            width: '200px'
        },
        columns: {}
    };

    constructor(protected router: Router, protected service: ApiService) {
        this.apiService = service;
    }

    async ngOnInit() {
        this.source = new LocalDataSource(await this.apiService.getResult());
    }

    onCreate(event: any) {
        this.router.navigate([this.baseUrl]);
    }

    changePerPage = (value: number): void => {
        this.source.setPaging(1, value, false);
        this.source.refresh();
    }


    onEdit(event: any) {
        this.router.navigate([this.baseUrl, event.data.id]);
    }

    onDeleteConfirm(event) {
        if (window.confirm(this.labels.delete.confirm)) {

            this.apiService.deleteData(event.data['id'])
                .then(data => {
                    this.source.remove(event.data);
                    this.alert.buildAlert(1, this.labels.delete.success);
                }, error => {
                    this.alert.buildAlert(0, JSON.parse(error._body).errorMessage);
                });
        } else {
            return false;
        }
    }

    saveStatus = (rowData, flagName, status): void => {
        if (flagName !== undefined && status !== undefined)
            rowData[flagName] = status;
        let newObject = this.newEntity(rowData);

        this.apiService.updateData(rowData.id, newObject)
            .then(data => {
                this.source.update(rowData, newObject);
                this.source.refresh();
                this.alert.buildAlert(1, this.labels.update.success);

            }, error => {
                if (error._body) {
                    this.alert.buildAlert(0, JSON.parse(error._body).errorMessage);

                } else if (error.exception) {
                    this.alert.buildAlert(0, error.exception);
                }
            });
    };

    clearFilter() {
        this.source.reset();
        this.statusActive = null;
        this.source.refresh();
        this.filters = {};
    }

    // Abstract
    newEntity = (rowData): Object => {
        return {};
    }

    search(field: string, value: any) {
        this.filters[field] = { field: field, value: value.toString() };
        this.source.reset();
        for (var key in this.filters) {
            this.source.setFilter([{ field: this.filters[key].field, search: this.filters[key].value }], true);
        }
    }
}
