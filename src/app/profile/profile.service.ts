import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { buildURL } from '../queries'
import api from '../api'

import 'rxjs/add/operator/toPromise';

@Injectable()
export class ProfileService {
  constructor(private http: Http) {}

  testMessage(): string {
    return 'Test message';
  }

  flickTestLogin(): Promise < object > {
    var accessTokenParams = JSON.parse(localStorage.getItem('accessToken'));
    var testLoginParams = {
      'oauth_token': accessTokenParams['oauth_token'],
      'format': 'json',
      'nojsoncallback': 1,
      'method': 'flickr.test.login'
    }
    return this.http.get(buildURL(testLoginParams, api['REST'], accessTokenParams['oauth_token_secret']))
      .toPromise()
      .then(response => JSON.parse(response.text()) as object)
      .catch(this.handleError)
  }

  private handleError(error: any): Promise < any > {
    console.log('An error occurred', error);
    return Promise.reject(error.message || error)
  }


}
