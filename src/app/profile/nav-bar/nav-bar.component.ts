import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  currentLocation: string;

  isWelcomeGreating = false;

  constructor(private location: Location) { }

  ngOnInit() {
    if(this.location.path() === '/profile'){
      this.isWelcomeGreating = true;
    }else {
      this.isWelcomeGreating = false;
    }
  }

  goBack(): void {
    this.location.back();
  }
}
