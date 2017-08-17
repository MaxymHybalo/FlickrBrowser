import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { AuthService } from './auth.service'
import { Location } from '@angular/common'
import { parseURLQuery } from './utils'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'app';

  constructor(
    private router: Router,
    private service: AuthService,
    private location: Location
  ) {}

  ngOnInit() {
    if (!localStorage.getItem('secret')) {
      this.router.navigate(['login'])
    } else if (!localStorage.getItem('accessToken')) {
      var search = window.location.search;
      var verifierParams = parseURLQuery(search.substring(1))
      this.service.accessToken(verifierParams)
        .then(response => {
          localStorage.setItem('accessToken', JSON.stringify(response));
          this.router.navigate(['profile']);
        });
    } else {
      let path = this.location.path();
      if (path === '' || path === '/') {
        this.router.navigate(['profile']);
      }
    }
  }
}
