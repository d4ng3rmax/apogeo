import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ModalComponent } from '../../components';
import { QuestionService } from './question.service';
import { Question } from '../../models';

@Component({
    selector: 'mm-question-modal',
    templateUrl: './modal.component.html'
})
export class QuestionModalComponent extends ModalComponent {

    constructor(protected fb: FormBuilder, protected service: QuestionService) {
        super(fb, service);
        this.defaultValues = { id: 0, question: '', active: false };
    }

    newEntity = (params): Object => {
        return new Question(params.id, params.question, params.active);
    }

    validate(value: any) {
        if (value['question'] == "") {
            this.dataGrid.alert.buildAlert(0, "O campo Frase requer ao menos 5 caracteres");
            return false;
        }
        return true;
    }
}
