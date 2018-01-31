import { Component, OnInit, Input } from '@angular/core';
import { Ng2SmartTableModule, ViewCell, LocalDataSource } from 'ng2-smart-table';

@Component({
    template: `
        <div style="width: 75%; margin: 0 auto;">
            <input class="tgl tgl-skewed" type="checkbox"
              id="checkbox{{ rowData.flagName }}"
              name="checkbox{{ rowData.flagName }}"
              [checked]="rowData[flagName]"
              disabled="true" />
            <label class="tgl-btn" data-tg-off="NÃO" data-tg-on="SIM" for="checkbox{{ rowData.flagName }}"></label>
        </div>
    `,
})
export class DisabledCheckboxComponent implements ViewCell, OnInit {

    row: any;
    flag: boolean;
    flagName: string;

    @Input() value: string | number;
    @Input() rowData: any;
    @Input() source: any;

    constructor() {
        this.row = this.rowData;
    }

    ngOnInit() {
        if (this.flagName === undefined) {
            this.flagName = 'enabled';
        }

        if (this.rowData !== undefined) {
            this.flag = this.rowData[this.flagName];
        } else {
            this.flag = false;
        }
    }

}
