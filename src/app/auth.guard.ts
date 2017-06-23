import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard {
    constructor(private router: Router, private auth: AuthService) {
    }

    canActivate() {
        if (!this.auth.loggedIn()) { // se cambio el valor ! para pruebas
            return true;
        } else {
            console.log('Token expired or not valid')
            localStorage.setItem('token', '');
//            localStorage.setItem('user', '');
            this.router.navigate(['/login']).catch(err => console.error(err));
            return false;
        }
    }
}
