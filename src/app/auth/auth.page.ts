import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  isLogin = true;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  promeni() {
    this.isLogin = !this.isLogin;
  }

  onSubmit(f: NgForm) {

    if (!f.valid) {
      return;
    }

    if (this.isLogin) {
      this.authService.login(f.value.email, f.value.password);
    } else {
      this.authService.signup(f.value.email, f.value.password);
    }
  }
}
