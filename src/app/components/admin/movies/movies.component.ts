import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import {Router} from '@angular/router';

import {MoviesService} from '../../../services/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  breadcrumb = [
    {
      title: 'home',
      link: '/admin'
    },
    {
      title: 'movies',
      link: null
    },
  ];
  buttonsEnd = [
    {
      title: 'upload video',
      link: '/admin/movies/upload'
    },
  ];
  dtOptions: DataTables.Settings = {};
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: any;
  videos: any;

  constructor(
    private movieService: MoviesService,
    private router: Router,
  ) {
    this.dtTrigger = new Subject();
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'simple_numbers',
      pageLength: 6,
      columns: [
        { title: 'id', visible: false },
        { },
        {
          searchable: false,
          className: 'text-center',
          width: '70px'
        },
        {
          width: '70px',
          render: function (data: any, type: any, full: any) {
            return (data / 60).toFixed(2);
          }
        },
        {}
      ],
      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        const self = this;
        // Unbind first in order to avoid any duplicate handler
        // (see https://github.com/l-lin/angular-datatables/issues/87)
        $('td', row).unbind('click');
        $('td', row).bind('click', () => {
          self.someClickHandler(data);
        });
        return row;
      }
    };

    this.movieService.getListVideos()
      .pipe(map(result => result.results))
      .subscribe(
        value => {
          this.videos = value;
          this.dtTrigger.next();
        }
      );
  }

  someClickHandler(data) {
    console.log(data[0]);
    this.router.navigate(['/admin/movies/details/', data[0]]);
  }

}
