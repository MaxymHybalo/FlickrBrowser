import { Component, OnInit, Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { parseURLQuery, sortObject } from '../utils'
import { REQUEST_TOKEN_PARAMS } from '../auth'
import api from '../api'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'app';
  url = null; 
  authenticated = null;
  

  constructor(private service: AuthService) {}

  ngOnInit(): void {    
    this.processAuth();
  }

  private processAuth(): void {
    var search = window.location.search;
    if(!this.authenticated){
      if(search) {
        this.authenticated = {}
        var verifierParams = parseURLQuery(search.substring(1))
        this.url = this.service.accessToken(verifierParams, REQUEST_TOKEN_PARAMS)
          .then(response => this.authenticated = response)
      } else {
        this.url = this.service.requestToken()
          .then(params => {
            this.url = api['AUTHORIZE'] + '?oauth_token=' 
              + params['oauth_token']
              + '&perms=read'; 
            localStorage.setItem('secret', params['oauth_token_secret']);
        })
      }
    }
  }
}