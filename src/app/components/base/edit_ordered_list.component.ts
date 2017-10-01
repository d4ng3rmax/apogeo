import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Alert } from '../../models';
import { ApiService } from './api.service';
import { AlertComponent } from './alert.component';

export class EditOrderedListComponent implements OnInit {

    @ViewChild('alert')
    alert: AlertComponent;
    menuEnabled: boolean = false;
    availableItems: Array<any> = [];
    selectedItems: Array<any> = [];
    urlId: number;
    object: any;
    listPath: string;
    childListName: string;
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
        this.loaded = false;
    }

    async ngOnInit() {
        this.loaded = false;
        let all = await this.childrenService.getActiveResult();
        if (this.urlId) {
            let serverObject = await this.service.getSingleResult(this.urlId);
            this.object = this.newEntity(serverObject);

            for (let prop in this.object[this.childListName])
                for (let i = 0; i < all.length; i++)
                    if (all[i].id == this.object[this.childListName][prop].id)
                        this.selectedItems.push(all[i]);

            for (let prop in this.object[this.childListName])
                all.splice(all.findIndex(o => o.id == this.object[this.childListName][prop].id), 1);

            this.availableItems = all;
        } else {
            this.availableItems = all;
        }
        this.loaded = true;
    }

    moveItem = (originSelect, from, to): void => {
        for (let i = originSelect.length - 1; i >= 0; i--) {
            if (originSelect[i].selected == false)
                continue;

            let child = this.newChild(originSelect[i].value, originSelect[i].text);
            to.push(child);
            from.splice(from.findIndex(c => this.compareChildren(c, child)), 1);
        }
    }

    moveAll = (from, to): void => {
        from.forEach(el => {
            to.push(el);
        });

        from.length = 0;
    }

    moveTop = (select, arrSelected): void => {
        for (var i = 0; i < select.length; i++) {
            if (select[i].selected == true) {
                let selectedItem = arrSelected.splice(i, 1);
                arrSelected.splice(0, 0, selectedItem[0]);
            }
        }
    }

    moveUp = (select, arrSelected): void => {
        for (let i = select.length - 1; i >= 0; i--) {
            if (select[i].selected != true || i == 0)
                continue;

            let selectedItem = arrSelected.splice(i, 1);
            arrSelected.splice(i - 1, 0, selectedItem[0]);
        }
    }

    moveDown = (select, arrSelected): void => {
        let selectCount = select.length;
        for (let i = 0; i < select.length; i++) {
            if (select[i].selected != true || i == selectCount)
                continue;

            let selectedItem = arrSelected.splice(i, 1);
            arrSelected.splice(i + 1, 0, selectedItem[0]);
        }
    }

    moveBottom = (select, arrSelected): void => {
        let selectCount = select.length;
        for (let i = select.length - 1; i >= 0; i--) {
            if (select[i].selected == true) {
                let selectedItem = arrSelected.splice(i, 1);
                arrSelected.splice(selectCount, 0, selectedItem[0]);
            }
        }
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
            }
            );
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
        delete this.object[this.childListName];
        this.object[this.childListName] = {};
        for (let i = 0; i < this.selectedItems.length; i++)
            this.object[this.childListName][i] = { "id": this.selectedItems[i].id };
        return this.object;
    }

    compareChildren(obj1: any, obj2: any) {
        return obj1.id == obj2.id;
    }

    // Abstract methods
    newEntity(serverObject: any) {
    }

    newChild(id: number, text: string) {
    }

}
