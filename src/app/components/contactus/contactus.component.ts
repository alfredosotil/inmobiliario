import { Component, OnInit } from '@angular/core';
declare var jQuery: any;

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
    
    private showInfoWindow($event) {
//        console.log("$event: ", $event);
    }

}
