import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router'
import { AuthService } from '../auth.service';
import { parseURLQuery } from '../../utils'

import api from '../../api'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  url = null; 
  isAuthenticated = false;

  constructor(private service: AuthService, private router: Router) {}

  ngOnInit(): void {    
    this.processAuth();
  }

  private processAuth(): void {
    this.url = this.service.requestToken()
      .then(params => {
        this.url = api['AUTHORIZE'] + '?oauth_token=' 
          + params['oauth_token']
          + '&perms=read'; 
        localStorage.setItem('secret', params['oauth_token_secret']);
    })
  }

  private checkStorage(){
    if (localStorage.getItem('accessToken')){
      return true;
    }
    return false;
  }
}
