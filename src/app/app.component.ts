import { Component, OnInit } from '@angular/core';
import b64_hmac_sha1 from 'hmacsha1';

var baseUrl = 'https://www.flickr.com/services/oauth/request_token';
var clientKey = '18a91e0d831c8ae7ce2f2478e8f7f2d0';

var clientSecret = '7f91aaf323eb9674';

var redirectUrl = encodeURIComponent('http://localhost:4200');
var timestamp = new Date().valueOf();
var nonce = Math.floor(Math.random() * (9999999999 - 1000000000) + 1000000000);
var signSecret = clientKey + clientSecret;
var parameters = 'oauth_callback=' + redirectUrl + '&oauth_consumer_key=' + clientKey 
                  + '&oauth_nonce=' + nonce + '&oauth_signature_method=HMAC-SHA1&oauth_timestamp=' + timestamp
                  + '&oauth_version=1.0';
var baseString = 'GET&' + encodeURIComponent(baseUrl) + '&' + encodeURIComponent(parameters); 
                  

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  signature =  null;
  baseString = baseString;

  title = 'app';

  url = null;

  ngOnInit(): void {    
    this.signature = b64_hmac_sha1(clientSecret + '&', baseString);
    console.log(this.signature);
    
    this.url = `https://www.flickr.com/services/oauth/request_token
?oauth_nonce=` + nonce + `
&oauth_timestamp=` + timestamp + `
&oauth_consumer_key=` + clientKey + `
&oauth_signature_method=HMAC-SHA1
&oauth_version=1.0
&oauth_callback=` + redirectUrl + 
`&oauth_signature=` + encodeURIComponent(this.signature)
  }

}