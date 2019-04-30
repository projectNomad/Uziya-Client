import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {AuthAdminGuard} from './guards/auth-admin.guard';

const appRoutes: Routes = [
  { path: 'auth', loadChildren: './components/auth/auth.module#AuthModule'},
  { path: 'admin', loadChildren: './components/admin/admin.module#AdminModule', canActivate: [AuthAdminGuard] },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
