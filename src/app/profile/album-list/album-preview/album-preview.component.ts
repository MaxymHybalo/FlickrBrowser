import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-album-preview',
  templateUrl: './album-preview.component.html',
  styleUrls: ['./album-preview.component.css']
})

export class AlbumPreviewComponent implements OnInit {

  @Input() album: object;

  constructor() { }

  ngOnInit() {
  }

}
