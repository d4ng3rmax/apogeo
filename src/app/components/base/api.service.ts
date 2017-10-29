import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { AuthService } from '../../auth';

export class ApiService {

    headers: Headers;
    results: Object[];
    apiRoot: string;
    options: RequestOptions;
    lastRequestCount: number = 0;

    constructor(protected http: Http, protected authService: AuthService) {
        this.headers = authService.getHeaders();
        this.headers.append('Content-Type', 'application/json');
        this.options = new RequestOptions({ headers: this.headers });
    }

    async getResult(): Promise<any> {

        const response = await this.http.get(`${this.apiRoot}`, this.options)
            .toPromise()
        return response.json();
    }

    async getActiveResult(): Promise<any> {

        const response = await this.http.get(`${this.apiRoot}/active`, this.options)
            .toPromise()
        return response.json();
    }

    async getSingleResult(id): Promise<any> {

        const response = await this.http.get(`${this.apiRoot}/${id}`, this.options)
            .toPromise()
        return response.json();
    }

    async createData(obj: Object): Promise<any> {
        return this.http.post(`${this.apiRoot}`, JSON.stringify(obj), this.options)
            .toPromise()
            .then((res) => res.json() || {})
            .catch((error) => Promise.reject(error.message || error));
    }

    async updateData(id: number, obj: Object): Promise<any> {
        return this.http.put(`${this.apiRoot + '/' + id}`, JSON.stringify(obj), this.options)
            .toPromise()
            .then((res) => res.json() || {})
            .catch((error) => Promise.reject(error.message || error));
    }

    async deleteData(id: number): Promise<any> {
        return this.http.delete(`${this.apiRoot + '/' + id}`, this.options)
            .toPromise()
            .then((res) => res.json() || {})
            .catch((error) => Promise.reject(error.message || error));
    }

    async toggleActive(objId: number): Promise<any> {
        return this.http.post(`${this.apiRoot}/${objId}/toggleActive`, {}, this.options)
            .toPromise();
            // .then((res) => res.json() || {})
            // .catch((error) => Promise.reject(error.message || error));
    }
}
