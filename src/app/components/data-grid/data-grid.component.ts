import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { AlertComponent } from '../../components/base/alert.component';
import { CheckboxComponent } from '../../components/custom-render/checkbox/checkbox.component';
import { DisabledCheckboxComponent } from '../../components/custom-render/checkbox/disabledCheckbox.component';
import { ApiService } from '../base/api.service';

export class DataGridComponent implements OnInit {

    @Input()
    alert: AlertComponent;
    baseUrl: string;
    source: LocalDataSource;
    apiService: ApiService;
    filters: any = {};
    empty: boolean = true;
    reloading: boolean = false;

    labels: any = {
        title: '',
        create: {
            success: 'Item salvo com sucesso!'
        },
        update: {
            success: 'Item salvo com sucesso!'
        },
        delete: {
            confirm: 'Deseja mesmo excluir esse item?',
            success: 'Item excluido com sucesso!'
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
            editButtonContent: '<i class="fa fa-pencil"><span>Salvar</span></i>',
            saveButtonContent: '<i class="fa fa-check"><span>Salvar</span></i>',
            cancelButtonContent: '<i class="fa fa-close"><span>Cancelar</span></i>',
        },
        delete: {
            confirmDelete: true,
            deleteButtonContent: '<i class="fa fa-close"><span>Excluir</span></i>',
        },
        noDataMessage: 'Nenhum registro encontrado.',
        actions: {
            columnTitle: 'Ações',
            width: '200px'
        },
        columns: {}
    };

    constructor(protected router: Router, protected service: ApiService) {
        this.apiService = service;
    }

    ngOnInit() {
        this.reload();
    }

    async reload() {
        if(this.reloading) { return; }
        this.reloading = true;
        let result:any[] = await this.apiService.getResult();
        this.empty = result === undefined || result.length === 0;
        this.source = new LocalDataSource(result);
        // this.empty = true
        // this.source = new LocalDataSource([]);
        this.reloading = false;
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
                    this.empty = this.source.count() === 0;
                    this.alert.buildAlert(1, this.labels.delete.success);
                }, error => {
                    this.alert.buildAlert(0, JSON.parse(error._body).errorMessage);
                });
        } else {
            return false;
        }
    }

    toggleActive = (rowData): void => {
        this.apiService.toggleActive(rowData.id)
            .then(data => {
                this.source.update(rowData, this.newEntity(data));
                this.source.refresh();
                this.alert.buildAlert(1, this.labels.update.success);
                this.reload();

            }, error => { this.alert.handleResponseError(error); });
    }

    // saveStatus = (rowData, flagName, status): void => {
    //     if (flagName !== undefined && status !== undefined)
    //         rowData[flagName] = status;
    //     let newObject = this.newEntity(rowData);
    //
    //     this.apiService.updateData(rowData.id, newObject)
    //         .then(data => {
    //             this.source.update(rowData, newObject);
    //             this.source.refresh();
    //             this.alert.buildAlert(1, this.labels.update.success);
    //
    //         }, error => {
    //             if (error._body) {
    //                 this.alert.buildAlert(0, JSON.parse(error._body).errorMessage);
    //
    //             } else if (error.exception) {
    //                 this.alert.buildAlert(0, error.exception);
    //             }
    //         });
    // };

    clearFilter() {
        this.source.reset();
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

    searchNumber(field: string, value: number, greaterThan: boolean) {
        this.filters[field] = { field: field, value: value.toString() };
        this.source.reset();
        for (var key in this.filters) {
            this.source.setFilter([{
                field: this.filters[key].field, search: this.filters[key].value,
                customFilter: (value: number, search: number) => {
                    if (greaterThan) return value > search;
                    return value < search;
                }

            }], true);
        }
    }

}
