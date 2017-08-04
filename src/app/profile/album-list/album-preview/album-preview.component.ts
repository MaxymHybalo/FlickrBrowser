import { Component, OnInit, Input } from '@angular/core';
import { AlbumService } from '../album.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-album-preview',
  templateUrl: './album-preview.component.html',
  styleUrls: ['./album-preview.component.css']
})

export class AlbumPreviewComponent implements OnInit {

  @Input() album: object;

  update: string;

  photo = null;
  photoResource = null;

  constructor(private service: AlbumService, private router: Router) { }

  ngOnInit() {
    this.update = new Date(parseInt(this.album['date_update'] + '000')).toDateString();
    this.service.getPhotos(this.album)
      .then(photoset => {
        this.photo = photoset;
        this.service.getPhotoSizes(photoset['photoset']['photo'][0]['id'])
          .then(sizes => {
            this.mapResource(sizes)
          }
        )
      })
  }
  
  browseAlbum() {
    this.router.navigate(['profile','album', this.album['id']])
  }

  private mapResource(resorce) {
    let sizes = resorce['sizes']['size'];
    this.photoResource = sizes[2];
  }
}
