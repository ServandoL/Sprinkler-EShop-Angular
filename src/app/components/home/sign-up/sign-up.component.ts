import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent  {
  constructor() {}



  createUserForm = new FormGroup(
    {
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
        ),
      ]),
      passwordCheck: new FormControl('', [Validators.required]),
    },
    { validators: passwordMatchValidator }
  );

  get firstName() {
    return this.createUserForm.get('firstName');
  }
  get lastName() {
    return this.createUserForm.get('lastName');
  }
  get email() {
    return this.createUserForm.get('email');
  }
  get password() {
    return this.createUserForm.get('password');
  }
  get passwordCheck() {
    return this.createUserForm.get('passwordCheck');
  }

  onSubmit() {
    alert('user created');
    console.log(
      `User: ${this.firstName?.value}, ${this.lastName?.value}\nemail: ${this.email?.value}\npassword: ${this.password?.value}`
    );
  }
}
export const passwordMatchValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('password');
  const passwordCheck = control.get('passwordCheck');
  return password?.value !== passwordCheck?.value ? { matchPassword: true } : null;
};
