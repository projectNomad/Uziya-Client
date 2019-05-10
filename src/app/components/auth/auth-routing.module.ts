import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {LoginLayoutComponent} from '../../layouts/login-layout/login-layout.component';
import {LoginComponent} from './login/login.component';
import {RegisterUserComponent} from './register-user/register-user.component';
import {RegisterActivationComponent} from './register-activation/register-activation.component';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component';


const routes: Routes = [
  {
    path: '',
    component: LoginLayoutComponent,
    children: [
      { path: '', component: LoginComponent },
      { path: 'register', component: RegisterUserComponent },
      {
        path: 'register/activate/:token',
        component: RegisterActivationComponent
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
      },
      {
        path: 'reset-password/:token',
        component: ResetPasswordComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
