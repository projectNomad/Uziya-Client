import {Component, OnInit, Output, Input, EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MustMatch} from '../../../../_helpers/must-match.validator';
import {UserService} from '../../../../services/user.service';


@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

  signupForm: FormGroup;
  submitted = false;
  @Output() successForm = new EventEmitter();;
  @Input() group;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.signupForm = this.formBuilder.group({
        firstname: [null, [ Validators.required, Validators.minLength(2) ]],
        lastname: [null],
        email: [null, [Validators.required, Validators.email]],
        termsuse: [null, [Validators.required]],
        password: [null, [
          Validators.required,
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/),
        ]],
        confirmation: [null]
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
      is_agreed_terms_use: this.signupForm.get('termsuse').value,
      gender: 'A',
      group: (this.group === 'producer') ? this.group : ''
    };

    this.userService.createNewUser(user)
      .subscribe(
        value => {
          this.submitted = false;
          this.successForm.emit(true);
        },
        err => {
          this.submitted = true;
          this.successForm.emit(false);

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
          if (err.error.termsuse) {
            this.f.termsuse.setErrors({apiError: err.error.termsuse});
          }
        }
      );
  }
}
