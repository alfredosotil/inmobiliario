import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { GlobalService } from 'app/global.service';
import { UtilService } from 'app/util.service';
import { LocalStorageService } from 'angular-2-local-storage';
//declare var App: any;

@Component({
    selector: 'app-root',
    //  providers: [ GlobalService, UtilService, AuthService ],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    static token = '';
    constructor(
        public gs: GlobalService,
        public us: UtilService,
        public auth: AuthService,
        public localStorageService: LocalStorageService
    ) {
    }
    ngOnInit() {
//        this.
    }
}
