import { Component, OnInit, Input } from '@angular/core';
import { Ng2SmartTableModule, ViewCell, LocalDataSource } from 'ng2-smart-table';

@Component({
    template: `
        <a href="javascript:void(0)" (click)="this.showDisconts( this.rowData )" class="fa fa-dollar"></a>
    `,
})
export class linkButton implements ViewCell, OnInit {

    // showDisconts: any;
    row: any;

    @Input() value: string | number;
    @Input() rowData: any;
    @Input() source: any;
    @Input() showDisconts: any;

    constructor() {
        this.row = this.rowData;
    }

    ngOnInit() {
    }

}
