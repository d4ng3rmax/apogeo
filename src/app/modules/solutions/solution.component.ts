import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SolutionService } from './solution.service';
import { ResultService, ResultsComponent } from '../results';
import { Alert, Solution, Result } from '../../models';
import { EditOrderedListComponent } from '../../components';

@Component({
    selector: 'app-solution',
    templateUrl: './solution.component.html',
    styleUrls: ['./solution.component.scss'],
    providers: [SolutionService, ResultService]
})
export class SolutionComponent extends EditOrderedListComponent {

    constructor(protected route: ActivatedRoute, protected router: Router,
        protected service: SolutionService, protected childrenService: ResultService) {
        super(route, router, service, childrenService);
        this.listPath = '/solutions/solution/list';
        this.childListName = 'resultOrder';
        this.object = this.newEntity({ id: 0, title: '', description: '', hasJobPosition: false, valor: 0, cortesia: false, resultOrder: {}, active: false });
        this.labels.create.success = 'Solução criada com sucesso!'
        this.labels.save.success = 'Solução salva com sucesso!'
        this.labels.delete.confirm = 'Deseja mesmo excluir essa solução?'
        this.labels.delete.success = 'Solução excluida com sucesso!'
    }

    newEntity(serverObject: any) {
        return new Solution(serverObject.id, serverObject.title, serverObject.description, serverObject.hasJobPosition, serverObject.valor, serverObject.cortesia, serverObject.resultOrder, serverObject.active);
    }

    newChild(value: number, text: string) {
        return new Result(value, text, 0);
    }

    compareChildren(obj1: any, obj2: any) {
        return obj1.id == obj2.id && obj1.title == obj2.title;
    }

    setActive = (status: boolean): void => {
        this.object.active = status;
    }

    setCortesia = (status: boolean): void => {
        this.object.cortesia = status;
    }

    setHasJobPosition = (status: boolean): void => {
        this.object.hasJobPosition = status;
    }
}
