import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from './app.component';

@Injectable()
export class AuthGuard {
    constructor(private router: Router, private app: AppComponent) {
    }

    canActivate() {
        if (this.app.auth.isLoggedIn) {
            return true;
        } else {
            this.router.navigate(['/login']).catch(err => console.error(err));
            return false;
        }
    }
}
