import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'persist-navigation',
    templateUrl: './persist-navigation.component.html',
    styleUrls: ['./persist-navigation.component.scss']
})
export class PersistNavigationComponent implements OnInit {

    @Input() urlId: number;
    @Input() listPath: String;
    @Input() loaded: boolean;

    @Output() save: EventEmitter<any> = new EventEmitter();
    @Output() update: EventEmitter<any> = new EventEmitter();
    @Output() deleteOne: EventEmitter<any> = new EventEmitter();

    constructor() { }

    ngOnInit() {
    }

    onSave = (): void => {
        this.save.emit();
    }

    onUpdate = (): void => {
        this.update.emit();
    }

    onDelete = (e): void => {
        this.deleteOne.emit();
    }
}
