import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
              private router: Router) { }

  token = new BehaviorSubject<{token: string}>(null);

  signup(email: string, password: string) {
    return this.http.post<{token: string}>('http://localhost:3000/user/signup', {email, password});
  }

  login(email: string, password: string) {
    this.http.post<{token: string}>('http://localhost:3000/user/login', {email, password})
        .subscribe(podaci => {
            this.token.next(podaci);
            localStorage.setItem('userToken', podaci.token);
            this.router.navigate(['/']);
        });
  }

  logout() {
      this.token.next(null);
      localStorage.removeItem('userToken');
      this.router.navigate(['/auth']);
  }
}
