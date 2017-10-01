import { Component, Input, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AlertComponent, ModalComponent } from '../../components';
import { QuestionService } from './question.service';
import { Question } from '../../models';

@Component({
    selector: 'mm-question-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['../../app.component.scss']
})
export class QuestionModalComponent extends ModalComponent {

    constructor(protected fb: FormBuilder, protected service: QuestionService) {
        super(fb, service);
        this.defaultValues = { id: 0, question: '', active: true };
    }

    newEntity = (params): Object => {
        return new Question(params.id, params.question, params.active);
    }

    validate(value: any) {
        let o = value['question'];
        if (o === null || o === '' || o.length < 5) {
            this.alert.buildAlert(0, "O campo Frase requer ao menos 5 caracteres");
            return false;
        }
        return true;
    }
}
