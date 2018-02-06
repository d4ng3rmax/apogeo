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

    // newEntity = (params): Object => {
    //     console.info( new DistributorDiscounts(params.id, params.minimumAnswers, params.maximunAnswers, params.discount) );
    //     return new DistributorDiscounts(params.id, params.minimumAnswers, params.maximunAnswers, params.discount);
    // }

    newEntity = (params) : any => {
        return [
            {id: 0, minimumAnswers: 1, maximunAnswers: 2, discount: 0},
            {id: 0, minimumAnswers: 3, maximunAnswers: 5, discount: 5},
            {id: 71, minimumAnswers: 6, maximunAnswers: 15, discount: 10},
            {id: 81, minimumAnswers: 16, maximunAnswers: 30, discount: 15},
            {id: 91, minimumAnswers: 31, maximunAnswers: 99999, discount: 20}
        ]
    }

    open(size: string) {
        this.object = this.discount;
        // this.discount.map(x => {
        //     console.info( x );
        // })
        this.alert.reset();
        this.modal.open('modal-xl');
    }


// [
//     {id: 51, minimumAnswers: 1, maximunAnswers: 2, discount: 0},
//     {id: 61, minimumAnswers: 3, maximunAnswers: 5, discount: 5},
//     {id: 71, minimumAnswers: 6, maximunAnswers: 15, discount: 10},
//     {id: 81, minimumAnswers: 16, maximunAnswers: 30, discount: 15},
//     {id: 91, minimumAnswers: 31, maximunAnswers: 99999, discount: 20}
// ]
}
