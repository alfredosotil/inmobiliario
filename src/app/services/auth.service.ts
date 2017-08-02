import 'rxjs/add/observable/of';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { tokenNotExpired } from 'angular2-jwt';
import { LocalStorageService } from 'angular-2-local-storage';

@Injectable()
export class AuthService {

    private isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject(true);
    constructor(
        private localStorageService: LocalStorageService
    ) { }

    get isLoggedIn() {
        return this.isLoggedIn$.getValue();
    }

    public logIn() {
        if (this.localStorageService.get('token') === undefined || this.localStorageService.get('token') === '') {
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
