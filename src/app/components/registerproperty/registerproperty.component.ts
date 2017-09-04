import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { asEnumerable } from 'linq-es2015';
import { PropertyService } from '../../services/property.service';
import { FormControl } from '@angular/forms';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
//import { Marker } from 'ng2-map';
//import { RatingComponent } from 'ngx-bootstrap';
declare var jQuery: any;
interface marker {
    lat: number;
    lng: number;
    label?: string;
    draggable: boolean;
}
@Component({
    selector: 'app-registerproperty',
    templateUrl: './registerproperty.component.html',
    styleUrls: ['./registerproperty.component.css']
})

export class RegisterpropertyComponent implements OnInit {

    //    @ViewChild('propertymarker') propertymarker: Marker;
    @ViewChild("search")
    public searchElementRef: ElementRef;
    private model = {};
    private listPropertyType = [];
    private listPropertyState = [];
    private listDetailsProperty = [];
    private markerposition = [];
    public overStar: number;
    public percent: number;
    public detailsgroups = [];
    public latitude: number;
    public longitude: number;
    public searchControl: FormControl;
    public zoom: number;

    constructor(
        private ps: PropertyService,
        private mapsAPILoader: MapsAPILoader,
        private ngZone: NgZone
    ) {
        //    this.pos = [43.7250,-79.7699];
    }

    ngOnInit() {
        this.zoom = 4;
        this.latitude = -12.0463730;
        this.longitude = -77.0427540;

        //create search FormControl
        this.searchControl = new FormControl();

        //set current position
        this.setCurrentPosition();

        //load Places Autocomplete
        this.mapsAPILoader.load().then(() => {
            let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
                types: ["address"]
            });
            autocomplete.addListener("place_changed", () => {
                this.ngZone.run(() => {
                    //get the place result
                    let place: google.maps.places.PlaceResult = autocomplete.getPlace();

                    //verify result
                    if (place.geometry === undefined || place.geometry === null) {
                        return;
                    }

                    //set latitude, longitude and zoom
                    this.latitude = place.geometry.location.lat();
                    this.longitude = place.geometry.location.lng();
                    this.zoom = 12;
                });
            });
        });

        this.getListPropertyType();
        this.getListPropertyState();
        this.getListDetailsProperty();
        //        console.log(this.listPropertyType);
        setTimeout(() => {
            jQuery('.selectpicker').selectpicker();
            jQuery('.datepickerjs').datepicker({
                format: 'yyyy/mm/dd',
                language: "es",
                autoclose: true,
                todayHighlight: true
            });
            jQuery(".touchspin").TouchSpin({
                buttondown_class: "btn blue",
                buttonup_class: "btn red"
            });
            jQuery(".ionslider").ionRangeSlider({
                grid: !0, from: 5, values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
            });
            //            jQuery(".wysihtml5").wysihtml5({stylesheets: false});
            jQuery(".maxlength").maxlength({
                limitReachedClass: "label label-danger",
                alwaysShow: !0
            });
            this.setDetailsGroups();
        }, 1000);
    }

    //    public hoveringOver(value: number): void {
    //        this.overStar = value;
    //        this.percent = 100 * (value / this.rating.max);
    //    };
    //
    //    public resetStar(): void {
    //        this.overStar = void 0;
    //    }

    private setCurrentPosition() {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.latitude = position.coords.latitude;
                this.longitude = position.coords.longitude;
                this.zoom = 12;
            });
        }
    }


    //    addMarker() {
    //        let randomLat = Math.random() * 0.0099 + -12.094613;
    //        let randomLng = Math.random() * 0.0099 + -77.036394;
    //        //    this.positions.push([randomLat, randomLng]);
    //        this.pos = [randomLat, randomLng];
    //        this.propertymarker.position = [randomLat, randomLng];
    //        console.log('marker position', this.pos)
    //    }
    private getListPropertyType() {
        this.ps.listPropertyType().subscribe(
            data => this.listPropertyType = data,
            error => alert(error),
            //            () => console.log(this.listPropertyType),
        );
    }

    private getListPropertyState() {
        this.ps.listPropertyState().subscribe(
            data => this.listPropertyState = data,
            error => alert(error),
            //            () => console.log(this.listPropertyState),
        );
    }

    private getListDetailsProperty() {
        this.ps.listDetailsProperty().subscribe(
            data => this.listDetailsProperty = data,
            error => alert(error),
            //            () => console.log(this.listDetailsProperty),
        );
    }

    private setDetailsGroups() {
        //        console.log(this.listDetailsProperty)
        this.detailsgroups = asEnumerable(this.listDetailsProperty)
            .Select((option, index) => { return { option, index }; })
            .GroupBy(
            x => Math.floor(x.index / 3),
            x => x.option,
            (key, options) => asEnumerable(options).ToArray()
            )
            .ToArray();
    }

    private onMapReady(map) {
        console.log('map ready', map);
    }

    private onIdle(event) {
        //        console.log('map idle', event.target);
    }

    private onMarkerInit(marker) {
        console.log('marker init', marker);
    }

    //    private onMapClick(event) {
    //        this.positions = [];
    //        //        this.positions.push([event.latLng.lat(), event.latLng.lng()]);
    //        //        this.positions.push(event.latLng);
    //
    //        console.log("property marker position ", this.propertymarker);
    //        //        this.propertymarker.position.lat = event.latLng        .lat();
    //        //        this.propertymarker.position.lng = event.latLng.lng();
    //
    //        //        this.markerposition = [event.latLng.lat(), event.latLng.lng()];
    //        event.target.panTo(event.latLng);
    //        //        var latLng = new google.maps.LatLng(event.latLng.lat(), event.latLng.lng());
    //        //        this.propertymarker.setPosition(event.latLng);
    //        console.log("map click ", event);
    //    }

    private showInfoWindow(event) {
        console.log("show info window", event);
    }

    clickedMarker(label: string, index: number) {
        console.log(`clicked the marker: ${label || index}`)
    }

    mapClicked($event: any) {
        console.log('map clicked: ', $event);
        this.latitude = $event.coords.lat;
        this.longitude = $event.coords.lng;
        //        let marker: marker;
        //        marker.lat = $event.coords.lat
        //        marker.lng = $event.coords.lng
        //        this.markers.push(marker);
    }

    markerDragEnd(m: marker, $event: MouseEvent) {
        console.log('dragEnd', m, $event);
    }


}

