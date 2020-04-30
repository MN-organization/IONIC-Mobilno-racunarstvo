import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Subject} from 'rxjs';
import {Router} from '@angular/router';
import {BackendConst} from '../backend-const';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient,
                private router: Router) {
    }

    token = new BehaviorSubject<{ token: string }>(null);
    greska = new Subject<string>();

    signup(email: string, password: string) {
        return this.http.post<{ token: string }>(BackendConst.backendAddress + '/user/signup', {email, password});
    }

    login(email: string, password: string) {
        this.http.post<{ token: string }>(BackendConst.backendAddress + '/user/login', {email, password})
            .subscribe(podaci => {
                this.token.next(podaci);
                localStorage.setItem('userToken', podaci.token);
                this.router.navigate(['/']);
            }, error => {
                console.log(error.error.poruka);
                this.greska.next('Uneti podaci nisu dobri');
            });
    }

    logout() {
        this.token.next(null);
        localStorage.removeItem('userToken');
        this.router.navigate(['/auth']);
    }

    autoLogin() {
        const token = localStorage.getItem('userToken');
        console.log('token: ' + token);
        if (!token) {
            return;
        }
        this.token.next({token});
    }
}
