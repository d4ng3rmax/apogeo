import { Component, ViewChild, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { CrudComponent, DataGridComponent } from '../../components'
import { DepartmentsDataGridComponent } from './data-grid.component';
import { Subject } from 'rxjs/Rx';
import { AuthService } from '../../auth';

@Component({
	selector: 'app-departments',
	templateUrl: './departments.component.html',
	styleUrls: ['../../components/data-grid/data-grid.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class DepartmentsComponent extends CrudComponent {

	@ViewChild(DepartmentsDataGridComponent) dataGrid: DataGridComponent;

	constructor(public authService: AuthService) {
		super();
	}
}
