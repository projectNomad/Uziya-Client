import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

import { SharedModule} from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RegisterActivationComponent} from './register-activation/register-activation.component';
import { RegisterUserComponent} from './register-user/register-user.component';
import { LoginLayoutComponent} from '../../layouts/login-layout/login-layout.component';
import { RegisterFormComponent } from './shared/register-form/register-form.component';


@NgModule({
  declarations: [
    ForgotPasswordComponent,
    RegisterUserComponent,
    ResetPasswordComponent,
    RegisterActivationComponent,
    LoginComponent,
    LoginLayoutComponent,
    RegisterFormComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    NgbCarouselModule,
  ]
})
export class AuthModule { }
