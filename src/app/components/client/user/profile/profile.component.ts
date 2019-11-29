import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {NotificationsService} from 'angular2-notifications';

import {User} from '../../../../models/user';
import {UserService} from '../../../../services/user.service';
import {AuthService} from '../../../../services/auth.service';
import {MustMatch} from '../../../../_helpers/must-match.validator';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  updateUserForm: FormGroup;
  updatePwdForm: FormGroup;
  user: User;
  submittedPwd = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private notificationService: NotificationsService,
    private router: Router
  ) {
    this.user = this.authService.getProfile();
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.updateUserForm = this.formBuilder.group({
      firstname: [this.user.first_name, [ Validators.required, Validators.minLength(2) ]],
      lastname: [this.user.last_name],
      email: [this.user.email, [Validators.required, Validators.email]],
      gender: [this.user.gender],
      group: ['t', [Validators.required]]
    });

    this.updatePwdForm = this.formBuilder.group({
        apassword: [null, [Validators.required]],
        password: [null, [
          Validators.required,
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/),
        ]],
        confirmation: [null]
      }, {
      validator: MustMatch('password', 'confirmation')
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.updateUserForm.controls; }
  get fP() { return this.updatePwdForm.controls; }

  onSubmitUpdateUser() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.updateUserForm.invalid) {
      return;
    }

    const values = {
      first_name: this.updateUserForm.get('firstname').value,
      last_name: this.updateUserForm.get('lastname').value,
      email: this.updateUserForm.get('email').value,
      gender: this.updateUserForm.get('gender').value,
    };
    console.log(this.user.url)

    this.userService.updateUser(this.user.url, values).subscribe(
      value => {
        this.submitted = false;
        this.notificationService.success(null, 'Modification du profile reussie');
        localStorage.setItem(environment.cookiesName.profile, JSON.stringify(value));
        this.router.navigate(['/user']);
      },
      err => {
        console.log('error', err)
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
        if (err.error.gender) {
          this.f.gender.setErrors({apiError: err.error.gender});
        }
      }
    );
  }

  onSubmitPwdUser() {
    this.submittedPwd = true;
    // stop here if form is invalid
    if (this.updatePwdForm.invalid) {
      return;
    }

    const apassword = this.updatePwdForm.get('apassword').value;
    const password = this.updatePwdForm.get('password').value;

    this.userService.updatePassword(apassword, password).subscribe(
      value => {
        this.submitted = false;
        this.notificationService.success(null, 'Modification du mot de passe reussi');
        this.router.navigate(['/user']);
      },
      err => {
        this.submittedPwd = true;
        if (err.error.password) {
          this.fP.password.setErrors({apiError: err.error.password});
        }
      }
    );
  }

}
