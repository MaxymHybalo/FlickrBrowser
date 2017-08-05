import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  currentLocation: string;

  username: string;

  isWelcomeGreeting = false;

  constructor(private location: Location) { }

  ngOnInit() {
    if(this.location.path() === '/profile'){
      this.isWelcomeGreeting = true;
      this.username = JSON.parse(localStorage.getItem('accessToken'))['username'];
      console.log(this.username);
      
    }else {
      this.isWelcomeGreeting = false;
    }
  }

  goBack(): void {
    this.location.back();
  }
}
