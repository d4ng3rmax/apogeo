import { Component, ViewChild, Input, OnInit } from '@angular/core';
import { CrudComponent, DataGridComponent } from '../../components'
import { QuestionsDataGridComponent } from './data-grid.component';
import { Subject } from 'rxjs/Rx';

@Component({
    selector: 'app-questions',
    templateUrl: './questions.component.html',
    styleUrls: ['../../components/data-grid/data-grid.component.scss']
})
export class QuestionsComponent extends CrudComponent {

    @ViewChild(QuestionsDataGridComponent) dataGrid: DataGridComponent;

}
