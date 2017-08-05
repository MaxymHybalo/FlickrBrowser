import { Component, OnInit } from '@angular/core';
import { ProfileService } from './profile.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  msg = ""

  isProfile = null;

  constructor(private service: ProfileService, private location: Location) { }

  ngOnInit() {
    this.msg = this.service.testMessage();
    this.service.flickTestLogin()
      .then(json => { 
        this.msg = json['user'].username._content;
      })   
  }

}
