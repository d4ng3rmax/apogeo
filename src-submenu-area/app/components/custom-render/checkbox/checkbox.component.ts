import { Component, OnInit, Input } from '@angular/core';
import { Ng2SmartTableModule, ViewCell, LocalDataSource } from 'ng2-smart-table';

@Component({
    template: `
        <div style="width: 75%; margin: 0 auto;">
            <input class="tgl tgl-skewed" type="checkbox"
              id="checkbox{{ rowData.id }}"
              name="checkbox{{ rowData.id }}"
              (click)="saveStatus(rowData, flagName, !rowData[flagName])"
              [checked]="rowData[flagName]" />
            <label class="tgl-btn" data-tg-off="NÃO" data-tg-on="SIM" for="checkbox{{ rowData.id }}"></label>
        </div>
    `,
})
export class CheckboxComponent implements ViewCell, OnInit {

    saveStatus: any;
    row: any;
    flagName: string;

    @Input() value: string | number;
    @Input() rowData: any;
    @Input() source: any;

    constructor() {
        this.row = this.rowData;
    }

    ngOnInit() {
        if (this.flagName === undefined) {
            this.flagName = 'active';
        }
    }

}
