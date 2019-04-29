import {Component, OnInit, render } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';

import {MoviesService} from '../../../services/movies.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [NgbDropdownConfig]
})
export class HomeComponent implements OnInit {
  breadcrumb: any[];
  dtOptions: DataTables.Settings = {};
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: any;
  videos: any;

  constructor(
    private movieService: MoviesService
  ) {
    this.dtTrigger = new Subject();
    this.breadcrumb = [
      {
        title: 'home',
        link: null
      }
    ];
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'simple_numbers',
      pageLength: 6,
      columns: [
        { title: 'id', visible: false },
        { title: 'Title'},
        {
          title: 'Is active',
          searchable: false,
          className: 'text-center'
        },
        {
          data: 'duration',
          render: function (data: any, type: any, full: any) {
            return (data / 60).toFixed(2);
          }
        },
        {
          title: 'genres'
        }
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
    console.log(data);
  }
}
