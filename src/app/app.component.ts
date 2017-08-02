import { Component, OnInit, Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'app';
  url = null; 

  constructor(private service: AuthService) {}

  ngOnInit(): void {    
    console.log(window.location);
    this.url = this.service.requestToken()
                .then(params => this.url = 'https://www.flickr.com/services/oauth/authorize?oauth_token=' 
                    + params['oauth_token']
                    + '&perms=read');
  }
}