import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  buttonsEnd: any[];
  breadcrumb: any[];

  constructor() {
    this.breadcrumb = [
      {
        title: 'home',
        link: '/admin'
      },
      {
        title: 'movies',
        link: null
      },
    ];
    this.buttonsEnd = [
      {
        title: 'upload video',
        link: '/admin/movies/upload'
      },
    ];
  }

  ngOnInit() {
  }

}
