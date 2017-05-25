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
        this.intializeMap();
    }
    public intializeMap() {
        let map: any;
        map = new GMaps({
            el: '#map',
            lat: 21.2334329,
            lng: 72.86372,
            scrollwheel: false
        });

        map.addMarker({
            lat: 21.2334329,
            lng: 72.86372,
            title: 'Marker with InfoWindow',
            infoWindow: {
                content: '<p>Advisor Melbourne, Merrick Way, <br>FL 12345 Australia<a href="#"  target="_blank">Themeforest</a></p>'
            }
        });
    }

}
