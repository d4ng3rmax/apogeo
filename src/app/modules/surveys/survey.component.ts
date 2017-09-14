import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SurveyService } from './survey.service';
import { PagesComponent, PageService } from '../pages';
import { Alert, Page, Survey } from '../../models';
import { EditOrderedListComponent } from '../../components';

@Component({
    selector: 'app-survey',
    templateUrl: './survey.component.html',
    styleUrls: ['./survey.component.scss'],
    providers: [SurveyService, PageService]
})
export class SurveyComponent extends EditOrderedListComponent {

    constructor(protected route: ActivatedRoute, protected router: Router,
        protected service: SurveyService, protected childrenService: PageService) {
        super(route, router, service, childrenService);
        this.listPath = '/surveys/survey/list';
        this.childListName = 'pageOrder';
        this.object = this.newEntity({ id: 0, title: '', pageOrder: {}, active: false });
        this.labels.create.success = 'Questionário criado com sucesso!'
        this.labels.save.success = 'Questionário salvo com sucesso!'
        this.labels.delete.confirm = 'Deseja mesmo excluir esse questionário?'
        this.labels.delete.success = 'Questionário excluido com sucesso!'
    }

    newEntity(serverObject: any) {
        return new Survey(serverObject.id, serverObject.title, serverObject.pageOrder, serverObject.active);
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
