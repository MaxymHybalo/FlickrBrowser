import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';



@Component({
  selector: 'app-photo-details',
  templateUrl: './photo-details.component.html',
  styleUrls: ['./photo-details.component.css']
})
export class PhotoDetailsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute, 
    private location: Location
  ) { }

  ngOnInit() {
    // this.route.paramMap
    //   .switchMap((params: ParamMap) => 
    //     this.service.getPhotos(
    //       params.get('id'), 
    //       this.currentPage, 
    //       PHOTO_PER_PAGE
    //     ))
    //   .subscribe(page => this.album = page['photoset']['photo'])
  }

}
