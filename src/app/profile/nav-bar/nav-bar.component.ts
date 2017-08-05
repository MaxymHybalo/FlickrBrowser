import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private location: Location) { }

  currentLocation: string;
  username: string;
  isWelcomeGreeting = false;


  ngOnInit() {
    if(this.location.path() === '/profile'){
      this.isWelcomeGreeting = true;
      this.username = JSON.parse(localStorage.getItem('accessToken'))['username'];
    }else {
      this.isWelcomeGreeting = false;
    }
  }

  goBack(): void {
    this.location.back();
  }
}
