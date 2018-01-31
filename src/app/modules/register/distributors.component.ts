import { Component, ViewChild, Input, OnInit } from '@angular/core';
import { CrudComponent, DataGridComponent } from '../../components'
import { DistributorsDataGridComponent } from './data-grid.component';
import { Subject } from 'rxjs/Rx';

@Component({
    selector: 'app-distributors',
    templateUrl: './distributors.component.html',
    styleUrls: ['../../components/data-grid/data-grid.component.scss']
})
export class DistributorsComponent extends CrudComponent {

    @ViewChild(DistributorsDataGridComponent) dataGrid: DataGridComponent;

}
