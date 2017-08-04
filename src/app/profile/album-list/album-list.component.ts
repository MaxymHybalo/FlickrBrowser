import { Component, OnInit } from '@angular/core';
import { AlbumService } from '../album.service';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.css']
})
export class AlbumListComponent implements OnInit {

  constructor(private service: AlbumService) { }

  photosets = null;

  ngOnInit() {
    this.service.getAlbums()
      .then(json => this.photosets =  json['photosets']['photoset'])
  }

}
