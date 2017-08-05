import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { PhotoService } from '../photo.service'

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-photo-details',
  templateUrl: './photo-details.component.html',
  styleUrls: ['./photo-details.component.css']
})
export class PhotoDetailsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute, 
    private location: Location,
    private service: PhotoService
  ) { }

  info: object;
  photo: object;

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) => {
        return this.service.getInfo(params.get('id'))
      })
      .subscribe(info => {
        this.info = info['photo']
        
        this.service.getPhotoSizes(this.info['id'])
          .then(sizes => this.photo = sizes)
      })
  }

  private setUploadDate(info) {
    let existingValue = info['dateuploaded'];
    info['dateuploaded'] = new Date(parseInt(existingValue + '000')).toDateString();
    return info; 
  }
}
