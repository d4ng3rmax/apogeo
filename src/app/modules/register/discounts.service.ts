import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { ApiService } from '../../components';
import { AuthService } from '../../auth';
import { environment } from '../../../environments/environment';

@Injectable()
export class DiscountsService extends ApiService {

    constructor(protected http: Http, protected authService: AuthService) {
        super(http, authService);
        this.apiRoot = environment.api.distributors;
    }

    async getSingleResult(id): Promise<any> {
        const response = await this.http.get(`${this.apiRoot}/${id}/discounts`, this.options)
            .toPromise()
        return response.json();
    }
}
