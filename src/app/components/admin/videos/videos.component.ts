import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import {Router} from '@angular/router';

import {VideoService} from '../../../services/video.service';

@Component({
  selector: 'app-movies',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit {
  breadcrumb = [
    {
      title: 'home',
      link: '/admin'
    },
    {
      title: 'videos',
      link: null
    },
  ];
  buttonsEnd = [
    {
      title: 'upload video',
      link: '/admin/videos/upload'
    },
  ];
  dtOptions: DataTables.Settings = {};
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: any;
  videos: any;

  constructor(
    private videoService: VideoService,
    private router: Router,
  ) {
    this.dtTrigger = new Subject();
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'simple_numbers',
      pageLength: 10,
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
        },
        {},
        {
          width: '70px',
        }
      ],
      rowCallback: (row: Node, data: any[] | object, index: number) => {
        $('td', row).unbind('click');
        $('td', row).bind('click', () => {
          this.someClickHandler(data);
        });
        return row;
      }
    };

    this.videoService.getListVideos({
      videoUser: true,
      is_deleted: false
    })
      .pipe(map(result => result.results))
      .subscribe(
        value => {
          this.videos = value;
          this.dtTrigger.next();
        }
      );
  }

  someClickHandler(data) {
    this.router.navigate(['/admin/videos/details/', data[0]]);
  }

}
