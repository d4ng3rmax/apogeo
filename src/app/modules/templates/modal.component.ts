import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ModalComponent } from '../../components';
import { TemplateService } from './template.service';
import { Template } from '../../models';

@Component({
    selector: 'mm-template-modal',
    templateUrl: './modal.component.html'
})
export class TemplateModalComponent extends ModalComponent {

    names: string[] = ['', 'ADMIN_QUESTIONARIO_RESPONDIDO', 'AVALIADO_NOVO_QUESTIONARIO', 'GERENTE_QUESTIONARIO_RESPONDIDO', 'GERENTE_NOVO_QUESTIONARIO'];

    constructor(protected fb: FormBuilder, protected service: TemplateService) {
        super(fb, service);
        this.defaultValues = { id: 0, name: '', description: '', subject: '', senderName: '', senderEmail: '', content: '' };
    }

    newEntity = (params): Object => {
        return new Template(params.id, params.name, params.description, params.subject, params.senderName, params.senderEmail, params.content);
    }

    validate(value: any) {
        if (value['description'] == "") {
            this.dataGrid.alert.buildAlert(0, "O campo Frase requer ao menos 5 caracteres");
            return false;
        }
        return true;
    }
}
