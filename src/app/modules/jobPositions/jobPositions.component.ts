import { Component, ViewChild, Input, OnInit } from '@angular/core';
import { CrudComponent, DataGridComponent } from '../../components'
import { JobPositionsDataGridComponent } from './data-grid.component';
import { Subject } from 'rxjs/Rx';

@Component({
    selector: 'app-job-positions',
    templateUrl: './jobPosition.component.html',
    styleUrls: ['../../components/data-grid/data-grid.component.scss']
})
export class JobPositionsComponent extends CrudComponent {

    @ViewChild(JobPositionsDataGridComponent) dataGrid: DataGridComponent;

}
