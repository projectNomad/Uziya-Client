import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {HomeClientComponent} from './home-client/home-client.component';
import {UserComponent} from './user/user.component';
import {ClientLayoutComponent} from '../../layouts/client-layout/client-layout.component';
import {ProfileComponent} from './user/profile/profile.component';

const routes
: Routes = [
  {
    path: '',
    component: ClientLayoutComponent,
    children: [
      { path: '', component: HomeClientComponent },
      { path: 'user', component: UserComponent},
      { path: 'user/profile', component: ProfileComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
