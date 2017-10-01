import { Component, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ModalComponent } from '../../components';
import { TemplateService } from './template.service';
import { Template } from '../../models';
import { AuthService } from '../../auth';

@Component({
    selector: 'mm-template-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})
export class TemplateModalComponent extends ModalComponent implements AfterViewInit {

    names: string[] = ['ADMIN_QUESTIONARIO_RESPONDIDO', 'AVALIADO_NOVO_QUESTIONARIO', 'GERENTE_QUESTIONARIO_RESPONDIDO', 'GERENTE_NOVO_QUESTIONARIO'];
    isAdmin: boolean = false;
    isDistributor: boolean = false;

    constructor(protected fb: FormBuilder, protected service: TemplateService, protected authService: AuthService) {
        super(fb, service);
        this.defaultValues = { id: 0, name: '', description: '', subject: '', senderName: '', senderEmail: '', content: '' };
    }

    ngOnInit() {
        super.ngOnInit();
    }

    newEntity = (params): Object => {
        return new Template(params.id, params.name, params.description, params.subject, params.senderName, params.senderEmail, params.content, params.clientId, params.clientName);
    }

    validate(value: any) {
        let o = value['description'];
        if (o === null || o === '' || o.length < 5) {
            this.alert.buildAlert(0, "O campo descrição requer ao menos 5 caracteres");
            return false;
        }
        return true;
    }

    // Editor

    @Output() onEditorKeyup = new EventEmitter<any>();
    editor: any;


    ngAfterViewInit() {
        this.isAdmin = this.authService.isAdmin();
        this.isDistributor = this.authService.isDistributor();
        this.onEditorKeyup.subscribe((content) => {
            // console.log('content: ' + content);
            this.form.controls['content'].setValue(content);
        });
        tinymce.init({
            selector: '#contentEditor',
            plugins: ['link', 'paste', 'table'],
            skin_url: 'skins/lightgray',
            height: 250,
            setup: editor => {
                this.editor = editor;
                editor.on('change', () => {
                    const content = editor.getContent();
                    this.onEditorKeyup.emit(content);
                });
            },
        });
    }

    ngOnDestroy() {
        console.log('destroying editor');
        tinymce.remove(this.editor);
    }

    initEditor() {
        this.ngAfterViewInit();
    }

    open(size: string) {
        this.editor.setContent(this.object.content);
        this.alert.reset();
        this.modal.open(size);
    }

}
