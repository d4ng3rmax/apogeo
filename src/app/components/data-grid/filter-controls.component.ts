import { Component, Input } from '@angular/core';
import { DataGridComponent } from './data-grid.component';

@Component({
    selector: 'filter-controls',

    template: `
    <div class="form-group">
        <label for="paging">Paginação:</label>
        <select #perPage (change)="dataGrid.changePerPage(perPage.value)" class="form-control" id="paging" style="width: 100px">
            <option value="5">5</option>
            <option value="10" selected>10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="50">50</option>
        </select>
    </div>
    <br />
    <div class="d-flex justify-content-center">
        <button (click)="dataGrid.clearFilter(); form.reset();" class="btn btn-default"> Limpar </button>
    </div>
    `
})
export class FilterControlsComponent {

    @Input('dataGrid')
    dataGrid: DataGridComponent;

    @Input('form')
    form: any;

}
