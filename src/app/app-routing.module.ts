import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {AuthGuard} from './guards/auth.guard';

const appRoutes: Routes = [
  { path: 'auth', loadChildren: './components/auth/auth.module#AuthModule'},
  { path: 'admin', loadChildren: './components/admin/admin.module#AdminModule', canActivate: [AuthGuard] },
  { path: '', loadChildren: './components/client/client.module#ClientModule', canActivate: [AuthGuard] },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
