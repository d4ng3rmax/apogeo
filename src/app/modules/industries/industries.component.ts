import { Component, ViewChild, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { CrudComponent, DataGridComponent } from '../../components'
import { IndustriesDataGridComponent } from './data-grid.component';
import { Subject } from 'rxjs/Rx';
import { AuthService } from '../../auth';

@Component({
	selector: 'app-industries',
	templateUrl: './industries.component.html',
	styleUrls: ['../../components/data-grid/data-grid.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class IndustriesComponent extends CrudComponent {

	@ViewChild(IndustriesDataGridComponent) dataGrid: DataGridComponent;

	constructor(public authService: AuthService) {
		super();
	}
}
