import { Component, ViewChild, Input, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { LocalDataSource } from 'ng2-smart-table';
import { ApiService } from './api.service';
import { AlertComponent } from '../../components/base/alert.component';

export class ModalComponent implements OnInit {

    @ViewChild('alert')
    alert: AlertComponent;
    form: FormGroup;
    source: LocalDataSource;
    dataGrid: any;
    object: any;
    selectedRow: any;
    defaultValues: any;
    type: string; // 'create' or 'edit'

    @ViewChild('modal')
    modal: ModalComponent;

    labels: any = { save: { success: 'Item salvo com sucesso!' } }

    constructor(protected fb: FormBuilder, protected service: ApiService) { }

    ngOnInit(): void {
        this.object = this.newEntity(this.defaultValues);
        this.form = this.fb.group(this.object);
    }

    getInstance = (instance): any => {
        this.dataGrid = instance;
    }

    open(size: string) {
        this.alert.reset();
        this.modal.open(size);
    }

    openModal(dataGrid, event?) {
        this.dataGrid = dataGrid;
        this.source = dataGrid.source;
        if (this.type === undefined || this.type == 'create') {
            this.object = this.newEntity(this.defaultValues);
        } else {
            this.object = event.data;
            this.selectedRow = event.data;
        }
        this.form = this.fb.group(this.object);
        this.open('lg');
    }

    onSubmit({ value }: { value: any }) {
        if (!this.validate(value)) {
            return;
        }

        this.object = this.newEntity(value);
        if (this.type === undefined || this.type == 'create')
            this.add(this.object);
        else
            this.edit(this.object);
        this.modal.close();
    }

    add(value: any): void {
        if (!value) {
            return;
        }
        this.service.createData(value)
            .then(data => {
                this.object = data;
                this.source.add(this.object);
                this.dataGrid.empty = this.source.count() === 0;
                this.source.refresh();
                this.dataGrid.alert.buildAlert(1, this.labels.save.success);
                this.alert.reset();
                this.form.setValue(JSON.parse(JSON.stringify(this.defaultValues)));

            }, error => {
                this.open('lg');
                this.alert.handleResponseError(error);
                this.dataGrid.alert.handleResponseError(error);
            });

    }

    edit(value: any): void {
        if (!value) {
            return;
        }
        this.service.updateData(value.id, value)
            .then(data => {
                this.object = data;
                this.source.update(this.selectedRow, this.object);
                this.source.reset();
                this.source.refresh();
                this.alert.reset();
                this.dataGrid.alert.buildAlert(1, this.labels.save.success);

            }, error => {
                this.open('lg');
                this.alert.handleResponseError(error);
                this.dataGrid.alert.handleResponseError(error);
            });
    }

    close() {
        this.modal.close();
        this.alert.reset();
        this.dataGrid.alert.reset();
    }

    // Abstract methods
    newEntity = (params): Object => {
        return {};
    }

    validate(value: any) {
        return true;
    }
}
