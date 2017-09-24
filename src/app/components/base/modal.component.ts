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
                this.source.refresh();
                this.dataGrid.alert.buildAlert(1, this.labels.save.success);
                this.alert.reset();
                this.form.setValue(JSON.parse(JSON.stringify(this.defaultValues)));

            }, error => {
                var errorObj = JSON.parse(error._body);
                if (errorObj.errorMessage) {
                    this.alert.buildAlert(0, errorObj.errorMessage);
                } else if (errorObj.message) {
                    this.alert.buildAlert(0, JSON.parse(error._body).message);
                } else {
                    this.alert.buildAlert(0, JSON.stringify(error._body));
                }
                this.open('lg');
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
                var errorObj = JSON.parse(error._body);
                if (errorObj.errorMessage) {
                    this.alert.buildAlert(0, errorObj.errorMessage);

                } else if (errorObj.message) {
                    this.alert.buildAlert(0, JSON.parse(error._body).message);
                } else {
                    this.alert.buildAlert(0, JSON.stringify(error._body));
                }
                this.open('lg');
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
