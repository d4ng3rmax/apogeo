import { Component, ViewChild, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Rx';
import { AlertComponent } from './alert.component';
import { DataGridComponent } from '../data-grid/data-grid.component';
import { Alert } from '../../models';

export class CrudComponent implements OnInit {

    dataGrid: DataGridComponent;
    alert: AlertComponent;
    menuEnabled: boolean = true;

    ngOnInit() {}

}
