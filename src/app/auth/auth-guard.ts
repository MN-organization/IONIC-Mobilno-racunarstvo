import { Injectable } from '@angular/core';
import {Router, CanLoad, UrlSegment, Route} from '@angular/router';
import { AuthService } from './auth.service';
import {Observable} from 'rxjs';
@Injectable()
export class AuthGuardService implements CanLoad {
    constructor(public auth: AuthService, public router: Router) {}

    canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
        console.log(!this.auth.token);
        console.log(this.auth.token);
        if (!this.auth.token.value) {
            this.router.navigate(['/auth']);
            return false;
        }
        return true;
    }
}
