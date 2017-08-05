import { Component, OnInit, Input } from '@angular/core';
import { AlbumService } from '../album/album.service';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.css']
})
export class AlbumListComponent implements OnInit {

  constructor(private service: AlbumService) { }

  @Input() username: string;

  greeting = 'Welcome, ' + this.username;
  

  photosets = null;

  ngOnInit() {
    this.service.getAlbums()
      .then(json => this.photosets =  json['photosets']['photoset'])
  }

}
