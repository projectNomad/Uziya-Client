import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';

import { AuthService } from '../../../../services/auth.service';
import {User} from '../../../../models/user';

@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.scss'],
  providers: [NgbDropdownConfig]
})
export class HeaderAdminComponent implements OnInit {

  user: User;

  constructor(
    private authService: AuthService,
    private router: Router,
    config: NgbDropdownConfig
  ) {
    config.placement = 'bottom';
    config.autoClose = true;

    this.user = this.authService.getProfile();
  }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth']);
  }

}
