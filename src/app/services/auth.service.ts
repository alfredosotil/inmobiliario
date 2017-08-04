import 'rxjs/add/observable/of';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { tokenNotExpired } from 'angular2-jwt';
import { LocalStorageService } from 'angular-2-local-storage';

@Injectable()
export class AuthService {

    private isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject((this.localStorageService.get('token') === null) ? false : true);
    constructor(
        private localStorageService: LocalStorageService
    ) {  }

    get isLoggedIn() {
        return this.isLoggedIn$.getValue();
    }

    public logIn() {
        console.log('token : ' + this.localStorageService.get('token'))
        if (this.localStorageService.get('token') === null) {
            this.isLoggedIn$.next(false);
        } else {
            this.isLoggedIn$.next(true);
        }
    }

    public logout() {
        console.log('Log Out user');
        this.localStorageService.clearAll();
        this.isLoggedIn$.next(false);
    }
}
