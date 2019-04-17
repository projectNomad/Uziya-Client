import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import {NotificationsService} from 'angular2-notifications';

import { UserService } from '../../../services/user.service';
import {environment} from '../../../../environments/environment';
import { MustMatch } from '../../../../_helpers/must-match.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  minLengthPassword = environment.min_length_password;
  minLengthFirstName = 2
  submitted = false;
  images = [
    'assets/images/static/login/1.jpg',
    'assets/images/static/login/2.JPG',
    'assets/images/static/login/3.JPG',
  ];

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private notificationService: NotificationsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.signupForm = this.formBuilder.group({
        firstname: [null, [ Validators.minLength(this.minLengthFirstName) ]],
        lastname: [null],
        email: [null, [Validators.required, Validators.email]],
        group: ['t', [Validators.required]],
        password: [null, [
          Validators.required,
          Validators.pattern(/[0-9a-zA-Z]{8,}/),
          Validators.minLength(environment.min_length_password)
        ]],
        confirmation: [null, [ Validators.required ]]
      },
      {
        validator: MustMatch('password', 'confirmation')
      });
  }

  // convenience getter for easy access to form fields
  get f() { return this.signupForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.signupForm.invalid) {
      return;
    }

    const user = {
      // The username has been removed because it is not useful.
      // So username = email
      username: this.signupForm.get('email').value,
      first_name: this.signupForm.get('firstname').value,
      last_name: this.signupForm.get('lastname').value,
      email: this.signupForm.get('email').value,
      password: this.signupForm.get('password').value,
      gender: 'A',
      group: this.signupForm.get('group').value,
    };

    this.userService.createNewUser(user)
      .subscribe(
      value => {
        this.notificationService.success('Enregistrement reussi', value.detail);
      },
        err => {
          this.submitted = true;

          if (err.error.first_name) {
            this.f.firstname.setErrors({apiError: err.error.first_name});
          }
          if (err.error.last_name) {
            this.f.lastname.setErrors({apiError: err.error.last_name});
          }
          if (err.error.email) {
            this.f.email.setErrors({apiError: err.error.email});
          }
          if (err.error.password) {
            this.f.password.setErrors({apiError: err.error.password});
          }
      },
      () => {
        this.router.navigate(['/auth/login']);
      }
    );
  }

}