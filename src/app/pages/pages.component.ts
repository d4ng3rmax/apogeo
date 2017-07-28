import { QuestionListComponent } from './../question-list/question-list.component';
import { Component, OnInit } from '@angular/core';
import { QuestionListService } from './../shared/question-list.service';

@Component({
    selector: 'app-pages',
    templateUrl: './pages.component.html',
    styleUrls: ['./pages.component.scss'],
    providers: [ QuestionListService ]
})
export class PagesComponent implements OnInit {

    avaliableItems : Array<any> = [];
    selectedItems : Array<any> = [];
    listService : any;

    constructor( private questionListService : QuestionListService ) {
        this.listService = this.questionListService;
    }

    async ngOnInit() {
        this.avaliableItems = await this.listService.getResult();
    }

    moveItem = ( item, from, to ) : void => {
        console.info('Item: '+item+' From: '+from+' To: '+to);
        let idx = from.indexOf( item );

        if ( idx != 1 ) {
            from.splice( idx, 1 );
            to.push( item );
        }
    }

    moveAll = ( from, to ) : void => {
        console.info('Move all  From:: '+from+' To:: '+to);

        from.forEach(el => {
            to.push( el );
        });

        from.length = 0;
    }
}