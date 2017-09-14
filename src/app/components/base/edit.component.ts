import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Alert } from '../../models';
import { ApiService } from './api.service';

export class EditComponent implements OnInit {

    menuEnabled: boolean = false;
    urlId: number;
    alert: Alert;
    object: any;
    listPath: string;

    labels: any = {
        create: {
            success: 'Item criado com sucesso!'
        },
        save: {
            success: 'Item salvo com sucesso!'
        },
        delete: {
            confirm: 'Deseja mesmo excluir esse item?',
            success: 'Item excluida com sucesso!'
        }
    }

    constructor(
        protected route: ActivatedRoute,
        protected router: Router,
        protected service: ApiService,
        protected childrenService: ApiService
    ) {
        this.urlId = (this.route.snapshot.params['id']) ? this.route.snapshot.params['id'] : false;
        this.alert = new Alert(0, "Title", "Message", "cssClass", false);
    }

    // Abstract methods
    async ngOnInit() {
    }

    populatedObject = (): Object => {
        return {};
    }

    availableOnThisObject = (all): void => {
    }

    save = (event): void => {
        this.service.createData(this.populatedObject())
            .then(data => {
                this.buildAlert(1, this.labels.create.success);

                setTimeout(() => {
                    this.router.navigate([this.listPath]);
                }, 2000);

            }, error => this.buildAlert(0, JSON.parse(error._body).errorMessage));
    }

    update = (event): void => {
        this.service.updateData(this.urlId, this.populatedObject())
            .then(data => {
                this.buildAlert(1, this.labels.save.success);

                setTimeout(() => {
                    this.router.navigate([this.listPath]);
                }, 2000);

            }, error => this.buildAlert(0, JSON.parse(error._body).errorMessage));
    }

    delete = (event) => {
        if (window.confirm(this.labels.delete.confirm)) {
            this.service.deleteData(this.urlId)
                .then(data => {
                    this.buildAlert(1, this.labels.delete.success);

                    setTimeout(() => {
                        this.router.navigate([this.listPath]);
                    }, 2000);
                }, error => {
                    this.buildAlert(0, JSON.parse(error._body).errorMessage);
                });

        } else {
            return;
        }
    }

    private buildAlert = (type: number, msg: string): void => {
        if (type == 1) {
            this.alert.type = 1;
            this.alert.title = "";
            this.alert.message = msg;
            this.alert.cssClass = "alert-success";
            this.alert.status = true;
        } else {
            this.alert.type = 0;
            this.alert.title = ""
            this.alert.message = msg;
            this.alert.cssClass = "alert-danger";
            this.alert.status = true;
            console.error(msg);
        }
    }
}
