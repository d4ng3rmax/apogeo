import { Component, ViewChild, Input, OnInit } from '@angular/core';
import { CrudComponent, DataGridComponent } from '../../components'
import { SolutionsDataGridComponent } from './data-grid.component';
import { Subject } from 'rxjs/Rx';

@Component({
    selector: 'app-solutions',
    templateUrl: './solutions.component.html',
    styleUrls: ['../../components/data-grid/data-grid.component.scss']
})
export class SolutionsComponent extends CrudComponent {

    @ViewChild(SolutionsDataGridComponent) dataGrid: DataGridComponent;

}
