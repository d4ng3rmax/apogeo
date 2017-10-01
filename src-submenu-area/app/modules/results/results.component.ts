import { Component, ViewChild, Input, OnInit } from '@angular/core';
import { CrudComponent, DataGridComponent } from '../../components'
import { ResultsDataGridComponent } from './data-grid.component';
import { Subject } from 'rxjs/Rx';

@Component({
    selector: 'app-results',
    templateUrl: './results.component.html',
    styleUrls: ['../../components/data-grid/data-grid.component.scss']
})
export class ResultsComponent extends CrudComponent {

    @ViewChild(ResultsDataGridComponent) dataGrid: ResultsDataGridComponent;

}
