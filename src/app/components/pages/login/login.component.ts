import {Component, NgModule, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// import {NotificationsService} from 'angular2-notifications';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [NgbCarouselConfig]
})
export class LoginComponent implements OnInit {
  signinForm: FormGroup;
  errorMessage: string;
  images = [
    'assets/images/static/login/1.jpg',
    'assets/images/static/login/2.JPG',
    'assets/images/static/login/3.JPG',
  ];

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    // private notificationService: NotificationsService,
    private router: Router,
    config: NgbCarouselConfig
  ) {
    // customize default values of carousels used by this component tree
    config.interval = 10000;
    config.wrap = true;
    config.keyboard = false;
    config.pauseOnHover = true;
  }


  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.signinForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{8,}/)]]
    });
  }

  onSubmit() {
    const email = this.signinForm.get('email').value;
    const password = this.signinForm.get('password').value;

    this.authService.authenticate(email, password).subscribe(
      (value) => {
        localStorage.setItem('token', value.token);
        // get user profile
        this.userService.getProfile().subscribe(
          data => {
            localStorage.setItem('userProfile', JSON.stringify(data));
            // this.notificationService.success(null, 'Vous êtes connecté');
            this.router.navigate(['/index']);
          }
        );
      },
      (error) => {
        this.errorMessage = 'L\'email et/ou le mot de passe sont incorrect';
      },
      () => {
      }
    );
  }
}
