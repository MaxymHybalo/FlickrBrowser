import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { buildURL, appKey } from '../../../queries'
import api from '../../../api'

import 'rxjs/add/operator/toPromise';

@Injectable()
export class PhotoService{
    constructor(private http: Http) {}
    accessToken = null;
    basicAPIParams = null;

    getPhotos(id, page=1, per_page=1): Promise<object>{
        this.init()
        let params = {
            method: 'flickr.photosets.getPhotos',
            photoset_id: id,
            user_id: decodeURIComponent(this.accessToken['user_nsid']),
            page: page,
            per_page: per_page
        }   
        params = Object.assign(this.basicAPIParams, params);
        return this.http.get(buildURL(params, api['REST'], this.accessToken['oauth_token_secret']))
            .toPromise()
            .then(response => response.json() as object)
            .catch(error => error)
    }

    getPhotoSizes(photoId): Promise<object> {
        this.init();
        let params = {
            method: 'flickr.photos.getSizes',
            photo_id: photoId
        }
        params = Object.assign(params, this.basicAPIParams);
        return this.http.get(buildURL(params, api['REST'], this.accessToken['oauth_token_secret']))
            .toPromise()
            .then(response => response.json() as object)
            .catch(error => error)
    }

    getInfo(photoId) {
        this.init();
        let params = {
            method: 'flickr.photos.getInfo',
            photo_id: photoId
        }
        params = Object.assign(params, this.basicAPIParams);
        return this.http.get(buildURL(params, api['REST'],  this.accessToken['oauth_token_secret']))
            .toPromise()
            .then(response => response.json() as object)
            .catch(error => error)
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