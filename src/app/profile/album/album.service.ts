import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { buildURL } from '../../queries'
import api from '../../api'

import 'rxjs/add/operator/toPromise';


@Injectable()
export class AlbumService{
    constructor(private http: Http) {}
    accessToken = null;
    basicAPIParams = null;

    getAlbums(): Promise<object> {
        this.init()
        let params = {
            method: 'flickr.photosets.getList'    
        }
        params = Object.assign(this.basicAPIParams, params);
        return this.http.get(buildURL(params,api['REST'], this.accessToken['oauth_token_secret']))
            .toPromise()
            .then(response => response.json() as object)
            .catch(error => error);

    }

    private init(): void { 
        this.accessToken = JSON.parse(localStorage.getItem('accessToken'));
        this.basicAPIParams = {
            format: 'json',
            nojsoncallback: 1,
            oauth_token: this.accessToken['oauth_token']
        } 
    }
}