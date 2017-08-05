import { Component, OnInit, Input } from '@angular/core';
import { AlbumService } from '../../album.service'


@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit {

  @Input() photo: object;

  sizes: object;

  constructor(private service: AlbumService) { }

  ngOnInit() {
    this.service.getPhotoSizes(this.photo['id'])
      .then(sizes => this.sizes = sizes['sizes']['size'][3])
  }

}
