export class Alert {
    type : number; // 0 : error; 1 : success
    title : string;
    message : string;
    cssClass : string;
    status : boolean;

    constructor( type : number, title : string, message : string, cssClass : string, status? : boolean ) {
        this.type = type;
        this.title = title;
        this.message = message;
        this.cssClass = cssClass;
        this.status = status || false;
    }
}