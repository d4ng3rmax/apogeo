import { Component, Input } from '@angular/core';
import { Alert } from '../../models';

@Component({
    selector: 'alert',

    template: `
    <div class="alert {{ obj.cssClass }} alert-dismissible fade show" role="alert" *ngIf="obj.status">
      <button type="button" class="close" aria-label="Close" (click)="reset(); false;">
        <span aria-hidden="true">&times;</span>
      </button>
      <span [innerHTML]="obj.title"></span>{{ obj.message }}
    </div>
    `
})
export class AlertComponent {

    obj: Alert;

    ngOnInit() {
        this.obj = new Alert(0, "Title", "Message", "cssClass", false);
    }

    public buildAlert = (type: number, msg: string, seconds: number = 10): void => {
        var interval = seconds * 1000;
        if (type == 1) {
            this.obj.type = 1;
            this.obj.title = "";
            this.obj.message = msg;
            this.obj.cssClass = "alert-success";
            this.obj.status = true;
        } else {
            this.obj.type = 0;
            this.obj.title = ""
            this.obj.message = msg;
            this.obj.cssClass = "alert-danger";
            this.obj.status = true;
            // console.error(msg);
        }

        setTimeout(() => {
            this.reset();
        }, interval);
    }

    public reset = (): void => {
        this.obj = new Alert(0, '', '', '', false);
    }

    public handleResponseError = (error: any): void => {
      try{
        var errorObj = JSON.parse(error._body);
        if (errorObj.errorMessage) {
            this.buildAlert(0, errorObj.errorMessage);
        } else if (errorObj.message) {
            this.buildAlert(0, JSON.parse(error._body).message);
        } else {
            this.buildAlert(0, JSON.stringify(error._body));
        }
      } catch (e) {
        this.buildAlert(0, 'Error: ' + error);
      }
    }
}
