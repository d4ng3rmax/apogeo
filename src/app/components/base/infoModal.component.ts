import { Component, ViewChild } from '@angular/core';
import { BsModalComponent } from 'ng2-bs3-modal';
import { DomSanitizer } from '@angular/platform-browser';

declare var jquery: any;
declare var $: any;

@Component({
    selector: 'infoModal',
    templateUrl: './infoModal.component.html',
    styleUrls: ['./infoModal.component.scss']
})
export class InfoModalComponent {

    @ViewChild('modal')
    modal: BsModalComponent;
    safeUrl: any;

    labels: any = {
        'title': '',
        'content': '',
        'url': '',
        'videoWidth': '0',
        'videoHeight': '0'
    }

    constructor(private _sanitizer: DomSanitizer) {}

    open(title: string, content: string, url: string, size: string = '') {
        this.labels.title = title;
        this.labels.content = content;
        this.labels.url = url;
        if (url.length === 0) {
            this.safeUrl = null;
        }
        this.modal.open('modal-' + size);
        // Workaround to fix modal bug: after opening a large modal, smaller modals all opened with large sizes
        $('.modal-dialog').removeClass('modal-center');
        $('.modal-dialog').removeClass('modal-full');
        $('.modal-dialog').removeClass('modal-xl');
        $('.modal-dialog').removeClass('modal-lg');
        $('.modal-dialog').removeClass('modal-md');
        $('.modal-dialog').removeClass('modal-sm');

        if(url.length > 0) {
            this.safeUrl = this._sanitizer.bypassSecurityTrustResourceUrl(url);
            this.labels.videoWidth = 560;
            this.labels.videoHeight = 315;
        } else {
            this.safeUrl = null;
            this.labels.videoWidth = 0;
            this.labels.videoHeight = 0;

        }
        // if(size !== 'xl') { $('.modal-dialog').removeClass('modal-xl'); }
        // if(size !== 'lg') { $('.modal-dialog').removeClass('modal-lg'); }
        // if(size !== 'md') { $('.modal-dialog').removeClass('modal-md'); }
        // if(size !== 'sm') { $('.modal-dialog').removeClass('modal-sm'); }
        $('.modal-dialog').addClass('modal-' + size);
    }

    close() {
        this.modal.close();
    }
}
