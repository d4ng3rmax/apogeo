import { Component, ViewChild, Input, OnInit } from '@angular/core';
import { CrudComponent, DataGridComponent } from '../../components'
import { TemplatesDataGridComponent } from './data-grid.component';
import { Subject } from 'rxjs/Rx';

@Component({
    selector: 'app-templates',
    templateUrl: './templates.component.html',
    styleUrls: ['../../components/data-grid/data-grid.component.scss']
})
export class TemplatesComponent extends CrudComponent {

    @ViewChild(TemplatesDataGridComponent) dataGrid: DataGridComponent;

}
