import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable()
export class AuthGuard {
    constructor(private router: Router, private auth: AuthService) {
    }

    canActivate() {
        if (this.auth.isLoggedIn) {
            return true;
        } else {
            this.router.navigate(['/login']).catch(err => console.error(err));
            return false;
        }
    }
}
