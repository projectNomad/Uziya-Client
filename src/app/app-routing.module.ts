import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {LoginLayoutComponent} from './layouts/login-layout/login-layout.component';
import {LoginComponent} from './components/pages/login/login.component';
import {SignupComponent} from './components/pages/signup/signup.component';
import {RegisterActivationComponent} from './components/pages/register-activation/register-activation.component';

const appRoutes: Routes = [{
  path: 'auth',
  component: LoginLayoutComponent,
  children: [
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    {
      path: 'register/activate/:token',
      component: RegisterActivationComponent
    }
  ]
}];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {
        enableTracing: true,
      })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
