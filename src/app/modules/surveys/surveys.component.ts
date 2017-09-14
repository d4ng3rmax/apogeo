import { Component, ViewChild, Input, OnInit } from '@angular/core';
import { CrudComponent, DataGridComponent } from '../../components'
import { SurveysDataGridComponent } from './data-grid.component';
import { Subject } from 'rxjs/Rx';

@Component({
    selector: 'app-surveys',
    templateUrl: './surveys.component.html',
    styleUrls: ['../../components/data-grid/data-grid.component.scss']
})
export class SurveysComponent extends CrudComponent {

    @ViewChild(SurveysDataGridComponent) dataGrid: DataGridComponent;

}
