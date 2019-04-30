import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {ClientLayoutComponent} from '../../layouts/client-layout/client-layout.component';
import {UserComponent} from './user/user.component';

const routes: Routes = [
  {
    path: '',
    component: ClientLayoutComponent,
    children: [
      { path: 'user/:id', component: UserComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
