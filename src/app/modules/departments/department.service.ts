import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { ApiService } from '../../components';
import { AuthService } from '../../auth';
import { environment } from '../../../environments/environment';

@Injectable()
export class DepartmentService extends ApiService {

    constructor(protected http: Http, protected authService: AuthService) {
        super(http, authService);
        this.apiRoot = environment.api.departments;
    }

    async createData(obj: Object): Promise<any> {
        let response = super.createData(obj);
        response.then((data) => {
            this.objectEmitter.emit(data);
        });
        return response;
    }

    // async getResult(): Promise<any> {
    //     const response = await this.http.get('/departments.json', this.options)
    //         .toPromise()
    //     return response.json();
    // }

}
