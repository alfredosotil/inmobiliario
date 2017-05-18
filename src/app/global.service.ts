import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { environment } from '../environments/environment';

@Injectable()
export class GlobalService {
    private inputSearch$ = new BehaviorSubject<string>('');
    private isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);
    private hostUrl: string = '';
    private api: string = '';
    constructor() {
        if (environment.production) {
            this.hostUrl = 'https://coarkpro.com/inmobiliario-yii-api/';
            this.api = 'web/';
        } else {
            this.hostUrl = 'http://localhost/inmobiliario-yii-api/';
            this.api = 'web/index-test.php/';
        }
    }

    set inputSearch(is: string) {
        this.inputSearch$.next(is);
    }

    get inputSearch() {
        return this.inputSearch$.getValue();
    }

    set isLoading(il: boolean) {
        this.isLoading$.next(il);
    }

    get isLoading() {
        return this.isLoading$.getValue();
    }

    getApiRestUrl() {
        //        return this.hostUrl + 'public/';
        return this.hostUrl + this.api;
    }

}