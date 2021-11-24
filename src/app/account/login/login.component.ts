import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private router: Router) {
    
  }

  userName: any;
  password: any;
  mouseoverLogin!: boolean;

  login(formValues: any) {
    this.router.navigate(['home']);
  }

}
