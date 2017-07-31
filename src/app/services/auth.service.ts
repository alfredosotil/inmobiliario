import 'rxjs/add/observable/of';
import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {

    constructor() { }

    public loggedIn() {
//        console.log('token auth service:' + localStorage.getItem('token'));
        if (localStorage.getItem('token') === undefined || localStorage.getItem('token') === '' ){
            return false;
        }        
//        return tokenNotExpired();
        return true;
    }

    public logout() {
        console.log('Log Out user');
        localStorage.removeItem('token')
    }
}
