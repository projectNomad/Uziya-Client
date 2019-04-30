import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';

import {User} from '../../../models/user';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-header-client-profile',
  templateUrl: './header-client-profile.component.html',
  styleUrls: ['./header-client-profile.component.scss'],
  providers: [NgbDropdownConfig]
})
export class HeaderClientProfileComponent implements OnInit {

  isAdmin = false;
  user: User;

  constructor(
    private router: Router,
    private authService: AuthService,
    config: NgbDropdownConfig
  ) {
    config.placement = 'bottom';
    config.autoClose = true;

    this.user = this.authService.getProfile();
  }

  ngOnInit() {
    this.isAdmin = this.authService.isAdmin();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth']);
  }
}
