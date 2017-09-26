import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ModalComponent } from '../../components';
import { ResultService } from './result.service';
import { Result } from '../../models';

@Component({
    selector: 'mm-result-modal',
    templateUrl: './modal.component.html'
})
export class ResultModalComponent extends ModalComponent {

    constructor(protected fb: FormBuilder, protected service: ResultService) {
        super(fb, service);
        this.defaultValues = { id: 0, description: '', codigo: '', active: true };
    }

    newEntity = (params): Object => {
        return new Result(params.id, params.description, params.codigo, params.active);
    }

    validate(value: any) {
        let o = value['description'];
        if (o === null || o === '' || o.length < 5) {
            this.alert.buildAlert(0, "O campo descrição requer ao menos 5 caracteres");
            return false;
        }
        o = value['codigo'];
        if (o === null || o === '' || o.length < 5) {
            this.alert.buildAlert(0, "O campo código requer ao menos 5 caracteres");
            return false;
        }
        return true;
    }
}
