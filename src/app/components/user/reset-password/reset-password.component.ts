import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute, Params, Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';

import { AuthService } from '../../../services/auth.service';
import { MustMatch } from '../../../_helpers/must-match.validator';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  token: string;
  submitted = false;
  resetPasswordForm: FormGroup;
  errors: string[];

  success: boolean = null;

  constructor(private activatedRoute: ActivatedRoute,
              private authenticationService: AuthService,
              private formBuilder: FormBuilder,
              private notificationService: NotificationsService,
              private router: Router) {

    this.resetPasswordForm = this.formBuilder.group(
      {
        password: [null, [
          Validators.required,
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/),
        ]],
        confirmation: [null, [
          Validators.required,
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/),
        ]]
      },
      {
        validator: MustMatch('password', 'confirmation')
      }
    );
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.token = params.token;
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.resetPasswordForm.controls; }

  onSubmit() {
    this.submitted = true;
    const password = this.resetPasswordForm.get('password').value;

    this.authenticationService.changePassword(this.token, password).subscribe(
      data => {
        this.notificationService.success(
          'Mot de passe réinitialiser',
          'Vous pouvez maintenant vous connecter.');
      },
      err => {
        if (err.error.non_field_errors) {
          this.errors = err.error.non_field_errors;
        }
        if (err.error.new_password) {
          this.resetPasswordForm.controls.password.setErrors({
            apiError: err.error.new_password
          });
        }
      },
      () => {
        this.router.navigate(['/auth']);
      }
    );
  }
}
