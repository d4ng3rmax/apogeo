import { Component, Input, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AlertComponent, ModalComponent } from '../../components';
import { JobPositionService } from './jobPosition.service';
import { JobPosition } from '../../models';

@Component({
    selector: 'mm-job-position-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['../../app.component.scss']
})
export class JobPositionModalComponent extends ModalComponent {

    constructor(protected fb: FormBuilder, protected service: JobPositionService) {
        super(fb, service);
        this.defaultValues = { id: 0, question: '', active: true };
    }

    newEntity = (params): Object => {
        return new JobPosition(params.id, params.title, params.pageOrder, params.active);
    }

    validate(value: any) {
        let o = value['title'];
        if (o === null || o === '' || o.length < 5) {
            this.alert.buildAlert(0, "O campo título requer ao menos 5 caracteres");
            return false;
        }
        return true;
    }
}
