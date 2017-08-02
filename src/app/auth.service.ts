import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http'
import { getRequestTokenURL, buildURL, REQUEST_TOKEN_PARAMS } from '../auth'
import { parseURLQuery } from '../utils'
import api from '../api'

import 'rxjs/add/operator/toPromise';

var accessTokenUrl: string = api['ACCESS_TOKEN_URL'];
var requestTokenUrl: string = api['REQUEST_TOKEN_URL'];

@Injectable()
export class AuthService {

    constructor(private http: Http) {}

    requestToken(): Promise<string> {
        return this.http.get(buildURL(REQUEST_TOKEN_PARAMS, requestTokenUrl))
                .toPromise()
                .then(response => parseURLQuery(response.text()) as object)
                .catch(error => error)
    }

    accessToken(verifierParams, defaultParams): Promise<string> {
        var params = Object.assign(verifierParams, defaultParams);
        var secret = localStorage.getItem('secret');
        var accessURL = buildURL(params, accessTokenUrl, secret);
        return this.http.get(accessURL)
                .toPromise()
                .then(response => parseURLQuery(response.text()) as object)
                .catch(this.handleError)
    }

    private handleError(error: any): Promise<any> {
        console.log('An error occurred', error);
        return Promise.reject(error.message || error)
    }


}
