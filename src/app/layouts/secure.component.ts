import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
declare var jQuery: any;
declare var App: any;
declare var Dashboard: any;
declare var Layout: any;
declare var Demo: any;
declare var QuickSidebar: any;
declare var QuickNav: any;

@Component({
    selector: 'secure-root',
    templateUrl: './secure.component.html',
    //  styleUrls: ['./secure.component.css']
})
export class SecureComponent implements OnInit{

    constructor(
        private router: Router,
        private app: AppComponent
    ) { }
    ngOnInit() {
        //        console.log("init secure interface")
        jQuery.backstretch("destroy");
        App.init();
        Dashboard.init();
        Layout.init();
        Demo.init();
        QuickSidebar.init();
        QuickNav.init();
    }

    public logOut() {
        this.router.navigate(['/home']).catch(err => console.error(err));
        this.app.auth.logout();
    }
}
