import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {LocalStorageGuard} from './guards/local-storage.guard';

const appRoutes: Routes = [
  { path: 'auth', loadChildren: './components/user/user.module#UserModule', canActivate: [LocalStorageGuard] },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
