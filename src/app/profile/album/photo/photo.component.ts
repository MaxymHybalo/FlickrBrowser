import { Component, OnInit, Input } from '@angular/core';
import { PhotoService } from './photo.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit {

  @Input() photo: object;

  sizes: object;

  info: object;

  constructor(private service: PhotoService, private router: Router) { }

  ngOnInit() {
    this.service.getPhotoSizes(this.photo['id'])
      .then(sizes => this.sizes = sizes['sizes']['size'][3])
    this.service.getInfo(this.photo['id'])
      .then(info => this.info = info['photo']);
  }
  
  openDetails(){
    this.router.navigate(['profile', 'photo', this.photo['id']]);
  }

}
