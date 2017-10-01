import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageService } from './page.service';
import { QuestionService, QuestionsComponent } from '../questions';
import { Alert, Page, Question } from '../../models';
import { EditOrderedListComponent } from '../../components';

@Component({
    selector: 'app-page',
    templateUrl: './page.component.html',
    styleUrls: ['../../app.component.scss', './page.component.scss'],
    providers: [PageService, QuestionService]
})
export class PageComponent extends EditOrderedListComponent {

    constructor(protected route: ActivatedRoute, protected router: Router,
        protected service: PageService, protected childrenService: QuestionService) {
        super(route, router, service, childrenService);
        this.listPath = '/surveys/page/list';
        this.childListName = 'questionOrder';
        this.object = this.newEntity({ id: 0, title: '', questionOrder: {}, active: true });
        // this.labels.create.success = 'Página criada com sucesso!'
        // this.labels.save.success = 'Página salva com sucesso!'
        // this.labels.delete.confirm = 'Deseja mesmo excluir essa página?'
        // this.labels.delete.success = 'Página excluida com sucesso!'
    }

    newEntity(serverObject: any) {
        return new Page(serverObject.id, serverObject.title, serverObject.questionOrder, serverObject.active);
    }

    newChild(value: number, text: string) {
        return new Question(value, text);
    }

    compareChildren(obj1: any, obj2: any) {
        return obj1.id == obj2.id && obj1.title == obj2.title;
    }

    setActive = (status: boolean): void => {
        this.object.active = status;
    }
}
