import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { ApiService } from '../../components';
import { AuthService } from '../../auth';
import { environment } from '../../../environments/environment';

@Injectable()
export class JobPositionService extends ApiService {

    // Usado pelo wizard
    object: any;

    constructor(protected http: Http, protected authService: AuthService) {
        super(http, authService);
        this.apiRoot = environment.api.jobPositions;
    }

    // async getSingleResult(id): Promise<any> {
    //     const response = await this.http.get('/jobPosition.json', this.options)
    //         .toPromise()
    //     return response.json();
    // }

    // async getResult(): Promise<any> {
    //     const response = await this.http.get('/jobPositions.json', this.options)
    //         .toPromise()
    //     return response.json();
    // }

    async getAreas(): Promise<any> {
        const areasUrl = environment.api.areas;
        // const areasUrl = '/areas.json';
        const response = await this.http.get(`${areasUrl}`, this.options).toPromise();
        return response.json();
    }

}
