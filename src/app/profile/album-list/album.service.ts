import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { buildApiUrl, buildURL, appKey } from '../../../auth'
import api from '../../../api'

import 'rxjs/add/operator/toPromise';

@Injectable()
export class AlbumService {
    constructor(private http: Http) {}
    
    getAlbums(): Promise<object> {
        let accessToken = JSON.parse(localStorage.getItem('accessToken'));
        let params = {
            method: 'flickr.photosets.getList',
            format: 'json',
            nojsoncallback: 1,
            oauth_token: accessToken['oauth_token']
        }
        return this.http.get(buildURL(params,api['REST'], accessToken['oauth_token_secret']))
            .toPromise()
            .then(response => response.json() as object)
            .catch(error => error);

    }
}