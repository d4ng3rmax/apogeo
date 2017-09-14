import { Component, ViewChild, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Rx';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

    menuEnabled: boolean = true;

    constructor() { }

    ngOnInit() { }

}
