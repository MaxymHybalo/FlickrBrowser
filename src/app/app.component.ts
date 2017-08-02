import { Component, OnInit, Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { parseURLQuery, sortObject } from '../utils'
import { REQUEST_TOKEN_PARAMS } from '../auth'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'app';
  url = null; 
  params = null;
  verifierParams = null;

  constructor(private service: AuthService) {}

  ngOnInit(): void {    
    this.processAuth();
  }

  processAuth(): void {
    var search = window.location.search;
    if(search) {
      this.verifierParams = parseURLQuery(search.substring(1))
      this.url = this.service.accessToken(this.verifierParams, REQUEST_TOKEN_PARAMS)
                  .then(response => this.url = response)
      
    } else {
      this.url = this.service.requestToken()
                .then(params => {
                   this.url = 'https://www.flickr.com/services/oauth/authorize?oauth_token=' 
                      + params['oauth_token']
                      + '&perms=read';
                    this.params = params; 
                    localStorage.setItem('secret', params['oauth_token_secret']);
                })
    }
  }
}