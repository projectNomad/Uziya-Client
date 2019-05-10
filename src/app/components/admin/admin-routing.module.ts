import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {AdminLayoutComponent} from '../../layouts/admin-layout/admin-layout.component';
import {HomeComponent} from './home/home.component';
import {VideosComponent} from './videos/videos.component';
import {RegisterVideoComponent} from './videos/register-video/register-video.component';
import {DetailsVideoComponent} from './videos/details-video/details-video.component';
import {UpdateVideoComponent} from './videos/update-video/update-video.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'videos', component: VideosComponent },
      { path: 'videos/upload', component: RegisterVideoComponent },
      { path: 'videos/details/:id', component: DetailsVideoComponent },
      { path: 'videos/update/:id', component: UpdateVideoComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
