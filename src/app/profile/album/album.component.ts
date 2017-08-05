import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { AlbumService } from '../album.service'
import 'rxjs/add/operator/switchMap';

const PHOTO_PER_PAGE = 9

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})


export class AlbumComponent implements OnInit {

  constructor(
    private location: Location, 
    private route: ActivatedRoute,
    private service: AlbumService
  ) { }

  album = [];

  currentPage = 1;


  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) => 
        this.service.getPhotos(
          params.get('id'), 
          this.currentPage, 
          PHOTO_PER_PAGE
        ))
      .subscribe(page => this.album = page['photoset']['photo'])
  }
  
  goBack(): void {
    this.location.back();
  }

  private markupToGrid(album) {
    album = album['photoset']['photo'];
    let mappedArray = [];
    for(let i=0; i<=album.lenght; i++){

    }
  }
}
