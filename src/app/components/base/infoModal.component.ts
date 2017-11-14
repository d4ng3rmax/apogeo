import { Component, ViewChild } from '@angular/core';
import { BsModalComponent } from 'ng2-bs3-modal';

declare var jquery: any;
declare var $: any;

@Component({
    selector: 'infoModal',
    template: `
    <modal #modal>
    <modal-header [show-close]="true">
    <h4 class="flex-first">{{labels.title}}</h4>
    </modal-header>
    <modal-body>
    <span class="infoModalContent" [innerHTML]="labels.content"></span>
    </modal-body>
    </modal>`,
    styleUrls: ['./infoModal.component.scss']
})
export class InfoModalComponent {

    @ViewChild('modal')
    modal: BsModalComponent;

    labels: any = {
        'title': '',
        'content': ''
    }

    constructor() {}

    open(title: string, content: string, size: string = '') {
        this.labels.title = title;
        this.labels.content = content;
        this.modal.open(size);
        // Workaround to fix modal bug: after opening a large modal, smaller modals all opened with large sizes
        if(size !== 'lg') { $('.modal-dialog').removeClass('modal-lg'); }
        if(size !== 'md') { $('.modal-dialog').removeClass('modal-md'); }
        if(size !== 'sm') { $('.modal-dialog').removeClass('modal-sm'); }
        $('.modal-dialog').addClass('modal-' + size);
    }

    close() {
        this.modal.close();
    }
}
