import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {VideoPlayerComponent} from './video-player/video-player.component';
import {VideoLayoutComponent} from '../../layouts/video-layout/video-layout.component';

const routes: Routes = [
  {
    path: '',
    component: VideoLayoutComponent,
    children: [
      { path: 'player/:id', component: VideoPlayerComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VideoRoutingModule { }
