import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionModalComponent } from './modal.component';
import { DataGridComponent, CheckboxComponent } from '../../components';
import { QuestionService } from './question.service';
import { Question } from '../../models';

@Component({
    selector: 'data-grid-questions',
    template: `<ng2-smart-table
        [settings]="settings"
        [source]="source"
        (create)="onCreate($event)"
        (edit)="onSave($event)"
        (delete)="onDeleteConfirm($event)"></ng2-smart-table>
        <div *ngIf="this.empty">
            <br />
            <a (click)="this.reload()" href="javascript:void(0)"> Tentar novamente</a>
            <img *ngIf="this.reloading" src="images/refresh.svg" width="16" height="16" />
        </div>
        <mm-question-modal></mm-question-modal>
        `,
    styleUrls: ['../../components/data-grid/data-grid.component.scss'],
    providers: [QuestionService],
    encapsulation: ViewEncapsulation.None
})
export class QuestionsDataGridComponent extends DataGridComponent {

    constructor(protected router: Router, protected service: QuestionService) {
        super(router, service);
        this.baseUrl = '/surveys/question';
        // this.labels.update.success = 'Frase atualizada com sucesso!';
        // this.labels.delete.success = 'Frase excluida com sucesso!';
        // this.labels.delete.confirm = 'Deseja mesmo excluir essa frase?';
        this.labels.add = 'Adicionar Frase';
        this.settings.columns = {
            question: {
                title: 'Nome', width: "70%", filter: false, editor: { type: 'textarea' }
            },
            active: {
                title: 'Ativo', type: 'custom', valuePrepareFunction: 'custom', width: '10%', renderComponent: CheckboxComponent, filter: false,
                onComponentInitFunction: (instance: any) => { instance.saveStatus = this.saveStatus; }
            }
        };
    }

    newEntity = (rowData): Object => {
        return new Question(rowData.id, rowData.question, rowData.active);
    }

    // Modal editor
    @ViewChild(QuestionModalComponent)
    modalComponent: QuestionModalComponent;

    onCreate(event: any) {
        this.alert.obj.status = false;
        this.modalComponent.type = 'create';
        this.modalComponent.openModal(this);
    }

    onSave(event: any) {
        this.modalComponent.type = 'edit';
        this.modalComponent.openModal(this, event);
    }
}
