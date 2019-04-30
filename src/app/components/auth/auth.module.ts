import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

import { SharedModule} from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RegisterActivationComponent} from './register-activation/register-activation.component';
import { SignupComponent} from './signup/signup.component';
import { LoginLayoutComponent} from '../../layouts/login-layout/login-layout.component';
import { ProfileComponent } from '../client/user/profile/profile.component';

@NgModule({
  declarations: [
    ForgotPasswordComponent,
    SignupComponent,
    ResetPasswordComponent,
    RegisterActivationComponent,
    LoginComponent,
    LoginLayoutComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    NgbCarouselModule,
  ]
})
export class AuthModule { }
