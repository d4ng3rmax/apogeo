import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Alert } from '../../models';
import { ApiService } from './api.service';
import { AlertComponent } from './alert.component';

export class EditComponent implements OnInit {

    @ViewChild('alert')
    alert: AlertComponent;
    menuEnabled: boolean = false;
    urlId: number;
    object: any;
    listPath: string;
    loaded: boolean;

    labels: any = {
        create: {
            success: 'Item salvo com sucesso!'
        },
        save: {
            success: 'Item salvo com sucesso!'
        },
        delete: {
            confirm: 'Deseja mesmo excluir esse item?',
            success: 'Item excluido com sucesso!'
        }
    }

    constructor(
        protected route: ActivatedRoute,
        protected router: Router,
        protected service: ApiService
    ) {
        this.urlId = (this.route.snapshot.params['id']) ? this.route.snapshot.params['id'] : false;
        this.loaded = false;
    }

    ngOnInit() {
        this.init();
    }

    async init() {
        this.loaded = false;
        if (this.urlId) {
            let serverObject = await this.service.getSingleResult(this.urlId);
            this.object = this.newEntity(serverObject);
            this.postInit();
        }
        this.loaded = true;
    }

    postInit() {

    }

    save = (event): void => {
        this.loaded = false;
        this.service.createData(this.populatedObject())
            .then(data => {
                this.loaded = true;
                this.alert.buildAlert(1, this.labels.create.success);

                setTimeout(() => {
                    this.router.navigate([this.listPath]);
                }, 2000);

            }, error => {
                this.loaded = true;
                this.alert.buildAlert(0, JSON.parse(error._body).errorMessage);
            });
    }

    update = (event): void => {
        this.loaded = false;
        this.service.updateData(this.urlId, this.populatedObject())
            .then(data => {
                this.loaded = true;
                this.alert.buildAlert(1, this.labels.save.success);

                setTimeout(() => {
                    this.router.navigate([this.listPath]);
                }, 2000);

            }, error => {
                this.loaded = true;
                this.alert.buildAlert(0, JSON.parse(error._body).errorMessage);
            });
    }

    delete = (event) => {
        this.loaded = false;
        if (window.confirm(this.labels.delete.confirm)) {
            this.service.deleteData(this.urlId)
                .then(data => {
                    this.loaded = true;
                    this.alert.buildAlert(1, this.labels.delete.success);

                    setTimeout(() => {
                        this.router.navigate([this.listPath]);
                    }, 2000);

                }, error => {
                    this.loaded = true;
                    this.alert.buildAlert(0, JSON.parse(error._body).errorMessage);
                });
            return false;
        }
        this.loaded = true;
        return false;
    }

    populatedObject = (): Object => {
        return this.object;
    }

    // Abstract methods
    newEntity(serverObject: any) {
    }

}
