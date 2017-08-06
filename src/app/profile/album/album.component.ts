import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { PhotoService } from './photo/photo.service'
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
    private service: PhotoService
  ) { }

  album = [];
  albumId: number;

  currentPage = 1;
  // contain number of avaliable pages
  pages: number;
  isLoadingPage = false;
  preloadHeight: number;

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) => 
        this.service.getPhotos(
          params.get('id'), 
          this.currentPage, 
          PHOTO_PER_PAGE
        ))
      .subscribe(page => {
        this.albumId = page['photoset']['id'];
        this.album = page['photoset']['photo'];
        this.pages = page['photoset']['pages'];
      })
  }

  @HostListener('window:scroll', ['$event']) handleScroll($event) {
    let body = document.querySelector('body');
    let scrollPos = body.scrollHeight - body.scrollTop;
    let pageState = this.currentPage < this.pages;
    if(scrollPos <= window.screen.availHeight && pageState && !this.isLoadingPage) {
      this.loadNext(body);
    }
    if(body.scrollHeight > this.preloadHeight) {
      this.isLoadingPage = false;
    }
  }

  goBack(): void {
    this.location.back();
  }

  private loadNext(body): void {
    // lookdown loading next page before loads previous 
    this.isLoadingPage = true;
    this.preloadHeight = body.scrollHeight;
    this.currentPage++;
    this.service.getPhotos(
      this.albumId,
      this.currentPage,
      PHOTO_PER_PAGE
    )
      .then(page => this.album = this.album.concat(page['photoset']['photo']))
  }


}
