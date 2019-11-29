import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-register-activation',
  templateUrl: './register-activation.component.html',
  styleUrls: ['./register-activation.component.scss']
})
export class RegisterActivationComponent implements OnInit {

  success: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) {
    this.success = false;
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.userService.activate(params.token).subscribe(
        data => {
          this.success = true;
        },
        error => {
          this.success = false;
        }
      );
    });
  }

}
