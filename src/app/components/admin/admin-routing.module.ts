import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {AdminLayoutComponent} from '../../layouts/admin-layout/admin-layout.component';
import {HomeComponent} from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
