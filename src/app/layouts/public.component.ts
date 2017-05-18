import { Component, OnInit } from '@angular/core';
import '../../../node_modules/wowjs/dist/wow.min.js';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { GlobalService } from 'app/global.service';
import { UtilService } from 'app/util.service';
import { AuthService } from '../services/auth.service';
declare var jQuery: any;
declare var WOW: any;


@Component({
    selector: 'public-root',
    templateUrl: './public.component.html',
    //  styleUrls: ['./public.component.css']
})

export class PublicComponent {

    constructor(
        private gs: GlobalService,
        private us: UtilService,
        private router: Router,
        private auth: AuthService
    ) {

    }
    ngOnInit() {
//        jQuery('.nav-button').on("click", function() {
//            if (jQuery(this).hasClass('active')) {
//                jQuery(this).removeClass('active').parent().find('.navigation').removeClass('active');
//            } else {
//                jQuery(this).addClass('active').parent().find('.navigation').addClass('active');
//            }
//        });
//
//        jQuery('.lines-button').on("click", function() {
//            if (jQuery(this).hasClass('active')) {
//                jQuery(this).removeClass('active').parent().find('.navigation').removeClass('active');
//            } else {
//                jQuery(this).addClass('active').parent().find('.navigation').addClass('active');
//            }
//        });
//        var wow = new WOW();
//        wow.init();
//        console.log(this.auth.checkAuth);
    }
    
    public logOut() {
        this.router.navigate(['/home']).catch(err => console.error(err));
        this.auth.logout();
    }
}