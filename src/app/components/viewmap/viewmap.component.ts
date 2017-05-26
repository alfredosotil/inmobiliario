import { Component, OnInit } from '@angular/core';
declare var google: any;
declare var jQuery: any;

@Component({
    selector: 'app-viewmap',
    templateUrl: './viewmap.component.html',
    styleUrls: ['./viewmap.component.css']
})
export class ViewmapComponent implements OnInit {

    constructor() { }

    ngOnInit() {
        jQuery('body,html').animate({ scrollTop: 0 }, 800);
        this.initializeMap();
        jQuery(".intro select").zelect({});
        jQuery(".selectbox").selectbox();
        jQuery(".nstSlider").nstSlider({
            "left_grip_selector": ".leftGrip",
            "right_grip_selector": ".rightGrip",
            "value_bar_selector": ".bar",
            "value_changed_callback": function(cause, leftValue, rightValue) {
                jQuery(this).parent().find(".leftLabel").text(leftValue);
                jQuery(this).parent().find(".rightLabel").text(rightValue);
            }
        });

        jQuery(".selectbox").selectbox();
        jQuery(".nstSlider").nstSlider({
            "left_grip_selector": ".leftGrip",
            "right_grip_selector": ".rightGrip",
            "value_bar_selector": ".bar",
            "value_changed_callback": function(cause, leftValue, rightValue) {
                jQuery(this).parent().find(".leftLabel").text(leftValue);
                jQuery(this).parent().find(".rightLabel").text(rightValue);
            }
        });

        jQuery('input[name="radio-btn"]').wrap('<div class="radio-btn"><i></i></div>');
        jQuery(".radio-btn").on('click', function() {
            var _this = jQuery(this),
                block = _this.parent().parent();
            block.find('input:radio').attr('checked', false);
            block.find(".radio-btn").removeClass('checkedRadio');
            _this.addClass('checkedRadio');
            _this.find('input:radio').attr('checked', true);
        });
        jQuery('input[name="check-box"]').wrap('<div class="check-box"><i></i></div>');
        jQuery.fn.toggleCheckbox = function() {
            this.attr('checked', !this.attr('checked'));
        }
        jQuery('.check-box').on('click', function() {
            jQuery(this).find(':checkbox').toggleCheckbox();
            jQuery(this).toggleClass('checkedBox');
        });
    }

    public initializeMap() {
        //add map, the type of map
        let mapOptions = {
            zoom: 12,
            draggable: true,
            scrollwheel: false,
            animation: google.maps.Animation.DROP,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            center: new google.maps.LatLng(-37.829000, 144.957000), // area location
            styles: [{ "stylers": [{ "saturation": -100 }, { "gamma": 1 }] }, { "elementType": "labels.text.stroke", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi.business", "elementType": "labels.text", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi.business", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi.place_of_worship", "elementType": "labels.text", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi.place_of_worship", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "road", "elementType": "geometry", "stylers": [{ "visibility": "simplified" }] }, { "featureType": "water", "stylers": [{ "visibility": "on" }, { "saturation": 50 }, { "gamma": 0 }, { "hue": "#50a5d1" }] }, { "featureType": "administrative.neighborhood", "elementType": "labels.text.fill", "stylers": [{ "color": "#c5c5c5" }] }, { "featureType": "road.local", "elementType": "labels.text", "stylers": [{ "weight": 0.5 }, { "color": "#ff0000" }] }, { "featureType": "transit.station", "elementType": "labels.icon", "stylers": [{ "gamma": 1 }, { "saturation": 50 }] }]
        };
        let mapElement = document.getElementById('map_canvas');
        let map = new google.maps.Map(mapElement, mapOptions);

        //add locations
        let locations: Array<any> = [
            ['<div class"info-window"><div class="image-label"><img class="img-responsive" src="images/map_image.jpg" alt="featured-properties-5"><label>On Sale</label></div><div class="map-detail"><a href="#"><h4>Pear Apartments</h4></a><p>S California Ave</p><span>Beds:4</span><span> Baths:2</span><span> SqFt:1200</span></div></div>',
                -37.829000, 144.957000, 'images/map_marker.png'],
            ['<div class"info-window"><div class="image-label"><img class="img-responsive" src="images/map_image.jpg" alt="featured-properties-5"><label>On Sale</label></div><div class="map-detail"><a href="#"><h4>Luxury Family Home</h4></a><p>S California Ave</p><span>Beds:4</span><span> Baths:2</span><span> SqFt:1200</span></div></div>', -37.912495, 144.628143, 'images/map_marker.png'],
            ['<div class"info-window"><div class="image-label"><img class="img-responsive" src="images/map_image.jpg" alt="featured-properties-5"><label>On Sale</label></div><div class="map-detail"><a href="#"><h4>Luxury Family Home</h4></a><p>S California Ave</p><span>Beds:4</span><span> Baths:2</span><span> SqFt:1200</span></div></div>', -37.796356, 144.961166, 'images/map_marker.png'],
            ['<div class"info-window"><div class="image-label"><img class="img-responsive" src="images/map_image.jpg" alt="featured-properties-5"><label>On Sale</label></div><div class="map-detail"><a href="#"><h4>Luxury Family Home</h4></a><p>S California Ave</p><span>Beds:4</span><span> Baths:2</span><span> SqFt:1200</span></div></div>', -37.800247, 144.947047, 'images/map_marker.png'],
        ];
        //declare marker call it 'i'
        let marker: any
        let i: number;
        //declare infowindow
        let infowindow = new google.maps.InfoWindow();
        //add marker to each locations
        for (i = 0; i < locations.length; i++) {
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(locations[i][1], locations[i][2]),
                map: map,
                icon: locations[i][3]
            });
            //click function to marker, pops up infowindow
            google.maps.event.addListener(marker, 'click', (function(marker, i) {
                return function() {
                    infowindow.setContent(locations[i][0]);
                    infowindow.open(map, marker);
                }
            })(marker, i));
        }
    }

}
