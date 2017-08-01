import { Component, OnInit } from '@angular/core';
import { getRequestTokenURL, getBaseQuery } from '../auth'
import b64_hmac_sha1 from 'hmacsha1';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  signature =  null;
  baseString = null;
  mockUrl = null;
  title = 'app';

  url = null;

  ngOnInit(): void {    
    this.mockUrl = getBaseQuery();
    var mockSign = getBaseQuery();
    this.url = getRequestTokenURL();
  }
}