import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  userName: any;
  password: any;
  mouseoverLogin!: boolean;

  constructor(private authService: AuthService, private router: Router) { }

  login(formValues: any) {
    this.authService.loginUser(formValues.userName, formValues.password)
    this.router.navigate(['home'])
  }

  cancel() {
    this.router.navigate(['home'])
  }

}
