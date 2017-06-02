import { Component, OnInit } from '@angular/core';
declare var jQuery: any;
declare var GMaps: any;

@Component({
    selector: 'app-contactus',
    templateUrl: './contactus.component.html',
    styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {

    constructor() { }

    ngOnInit() {
        jQuery('body,html').animate({ scrollTop: 0 }, 800);
    }
    
    private showInfoWindow(t) {
        var e = t.target;
        e.ng2MapComponent.openInfoWindow("iw", e, {})
    }

}
