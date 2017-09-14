import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobPositionService } from './jobPosition.service';
import { PagesComponent, PageService } from '../pages';
import { Alert, Page, JobPosition } from '../../models';
import { EditOrderedListComponent } from '../../components';

@Component({
    selector: 'app-job-position',
    templateUrl: './jobPosition.component.html',
    styleUrls: ['./jobPosition.component.scss'],
    providers: [JobPositionService, PageService]
})
export class JobPositionComponent extends EditOrderedListComponent {

    constructor(protected route: ActivatedRoute, protected router: Router,
        protected service: JobPositionService, protected childrenService: PageService) {
        super(route, router, service, childrenService);
        this.listPath = '/jobPositions/jobPosition/list';
        this.childListName = 'pageOrder';
        this.object = this.newEntity({ id: 0, title: '', pageOrder: {}, active: false });
        this.labels.create.success = 'Questionário criado com sucesso!'
        this.labels.save.success = 'Questionário salvo com sucesso!'
        this.labels.delete.confirm = 'Deseja mesmo excluir esse questionário?'
        this.labels.delete.success = 'Questionário excluido com sucesso!'
    }

    newEntity(serverObject: any) {
        return new JobPosition(serverObject.id, serverObject.title, serverObject.pageOrder, serverObject.active);
    }

    newChild(value: number, text: string) {
        return new Page(value, text, {});
    }

    compareChildren(obj1: any, obj2: any) {
        return obj1.id == obj2.id && obj1.title == obj2.title;
    }

    setActive = (status: boolean): void => {
        this.object.active = status;
    }
}
