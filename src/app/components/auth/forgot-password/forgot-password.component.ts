import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {NotificationsService} from 'angular2-notifications';

import { AuthService} from '../../../services/auth.service';
import {_} from '@biesbjerg/ngx-translate-extract/dist/utils/utils';
import {MyNotificationsService} from '../../../services/core/my-notifications.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm: FormGroup;
  errors: string;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthService,
    private notificationService: MyNotificationsService,
  ) { }

  // convenience getter for easy access to form fields
  get f() { return this.forgotPasswordForm.controls; }

  ngOnInit() {
    this.forgotPasswordForm = this.formBuilder.group(
      {
        email: [null, [Validators.required, Validators.email]],
      });
  }

  onSubmit() {
    this.submitted = true;
    const email = this.forgotPasswordForm.get('email').value;

    this.authenticationService.resetPassword(email).subscribe(
      data => {
        this.submitted = false;
        this.notificationService.success(
          _('auth.forgot-password.success.title'),
          _('auth.forgot-password.success.message')
        );
      },
      err => {
        this.submitted = true;
        if (err.error.non_field_errors) {
          this.f.email.setErrors({apiError: err.error.non_field_errors});
        }
        if (err.error.email) {
          this.f.email.setErrors({
            apiError: err.error.email
          });
        }
      }
    );
  }
}
