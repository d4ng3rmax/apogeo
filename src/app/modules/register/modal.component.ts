import { Component, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ModalComponent } from '../../components';
import { DiscountsService } from './discounts.service';
import { DistributorDiscounts } from '../../models';
import { AuthService } from '../../auth';

@Component({
    selector: 'mm-distributor-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})
export class DistributorModalComponent extends ModalComponent{

    discount: any[];

    constructor(protected fb: FormBuilder, protected service: DiscountsService, public authService: AuthService) {
        super(fb, service);
        this.defaultValues = { id: 0, minimumAnswers: '', maximunAnswers: '', discount: '' };
    }

    newEntity = (params): Object => {
        return new DistributorDiscounts(params.id, params.minimumAnswers, params.maximunAnswers, params.discount);
    }

    open(size: string) {
        console.info( this.discount );
        this.alert.reset();
        this.modal.open('modal-xl');
    }

}
