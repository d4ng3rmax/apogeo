import { Component, ViewChild, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { CrudComponent, DataGridComponent } from '../../components'
import { JobPositionsDataGridComponent } from './data-grid.component';
import { Subject } from 'rxjs/Rx';
import { AuthService } from '../../auth';

@Component({
	selector: 'app-job-positions',
	templateUrl: './jobPositions.component.html',
	styleUrls: ['../../components/data-grid/data-grid.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class JobPositionsComponent extends CrudComponent {

	@ViewChild(JobPositionsDataGridComponent) dataGrid: DataGridComponent;

	constructor(public authService: AuthService) {
		super();
	}
}
