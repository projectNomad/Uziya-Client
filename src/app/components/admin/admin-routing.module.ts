import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {AdminLayoutComponent} from '../../layouts/admin-layout/admin-layout.component';
import {HomeComponent} from './home/home.component';
import {MoviesComponent} from './movies/movies.component';
import {RegisterVideoComponent} from './movies/register-video/register-video.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'movies', component: MoviesComponent },
      { path: 'movies/upload', component: RegisterVideoComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
