import { Component, OnInit } from '@angular/core';



import {AuthService} from '../../../services/auth.service';
import {User} from '../../../models/user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header-client',
  templateUrl: './header-client.component.html',
  styleUrls: ['./header-client.component.scss']
})
export class HeaderClientComponent implements OnInit {
  user: User;

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {
    this.user = this.authService.getProfile();
  }

  ngOnInit() {
  }
}
