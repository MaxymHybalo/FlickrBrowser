import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http'
import { getRequestTokenURL } from '../auth'

import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {
    constructor(private http: Http) {}

    requestToken(): Promise<string> {
        return this.http.get(getRequestTokenURL())
                .toPromise()
                .then(response => this.parseResponse(response.text()) as object)
                .catch(error => error)
    }

    private parseResponse(data: string) {
        var map = data.split('&')
        console.log('Splited values: ' , map);
        var response = {}
        map.forEach(element => {
            let keyValue = element.split('=');
            response[keyValue[0]] = keyValue[1];
        });      
        return response;
    }

    private handleError(error: any): Promise<any> {
        console.log('An error occurred', error);
        return Promise.reject(error.message || error)
    }
}