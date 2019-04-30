import { Component, OnInit } from '@angular/core';

import {User} from '../../../models/user';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  user: User;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.user = this.authService.getProfile();
    console.log(this.user);
  }

}
