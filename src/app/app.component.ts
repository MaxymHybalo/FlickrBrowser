import { Component, OnInit, Injectable } from '@angular/core';
import { Router } from '@angular/router'
import { AuthService } from './auth.service';
import { parseURLQuery, sortObject } from '../utils'
import { REQUEST_TOKEN_PARAMS } from '../auth'
import api from '../api'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title = 'app';
  url = null; 
  isAuthenticated = false;
  
  constructor(private service: AuthService, private router: Router) {}

  ngOnInit(): void {    
    this.processAuth();
  }

  private processAuth(): void {
    var search = window.location.search;
    if(!this.isAuthenticated){
      if(search) {
        this.isAuthenticated = true
        var verifierParams = parseURLQuery(search.substring(1))
        this.url = this.service.accessToken(verifierParams, REQUEST_TOKEN_PARAMS)
          .then(response => {
            localStorage.setItem('accessToken', JSON.stringify(response));
            this.router.navigate(['profile']);
          });
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