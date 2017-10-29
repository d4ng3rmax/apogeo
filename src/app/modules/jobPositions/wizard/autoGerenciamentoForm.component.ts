import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobPositionService } from '../jobPosition.service';
import { DepartmentService } from '../../departments';
import { Alert, JobPosition } from '../../../models';
import { EditComponent } from '../../../components';
declare var jquery: any;
declare var $: any;

@Component({
    selector: 'autoGerenciamentoForm',
    templateUrl: './autoGerenciamentoForm.component.html',
    styleUrls: ['../jobPosition.component.scss', '../../../app.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [JobPositionService, DepartmentService]
})
export class AutoGerenciamentoFormComponent implements OnInit {

    autoGereciamentos1: any[];
    autoGereciamentos2: any[];

    constructor(protected route: ActivatedRoute,
        protected router: Router,
        protected service: JobPositionService) {
    }

    ngOnInit() {
    }

    initMap() {
    }

    validate() {
        return true;
    }
}
