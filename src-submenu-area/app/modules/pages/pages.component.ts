import { Component, ViewChild, Input, OnInit } from '@angular/core';
import { CrudComponent, DataGridComponent } from '../../components'
import { PagesDataGridComponent } from './data-grid.component';
import { Subject } from 'rxjs/Rx';

@Component({
    selector: 'app-pages',
    templateUrl: './pages.component.html',
    styleUrls: ['../../components/data-grid/data-grid.component.scss']
})
export class PagesComponent extends CrudComponent {

    @ViewChild(PagesDataGridComponent) dataGrid: DataGridComponent;

}
