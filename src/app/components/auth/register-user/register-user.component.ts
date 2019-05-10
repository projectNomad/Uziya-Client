import { Component, OnInit } from '@angular/core';
import {Route, Router} from '@angular/router';

import {NotificationsService} from 'angular2-notifications';

@Component({
  selector: 'app-signup',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {

  images = [
    'assets/images/static/login/1.jpg',
    'assets/images/static/login/2.JPG',
    'assets/images/static/login/3.JPG',
  ];

  constructor(
    private notificationService: NotificationsService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmitForm(event) {
    if (event) {
      this.notificationService.success('Féllicitation vous avez réussi à créer un compte');
      this.router.navigate(['auth']);
    }
  }

}
