import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {

  constructor(private location: Location, private route: ActivatedRoute) { }
  id: string = '';

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) => params.get('id'))
      .subscribe(id => {
        this.id += id;
      })
  }
}
