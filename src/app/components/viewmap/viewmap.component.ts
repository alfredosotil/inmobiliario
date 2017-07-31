import { Component, OnInit } from '@angular/core';
declare var google: any;
declare var jQuery: any;

@Component({
    selector: 'app-viewmap',
    templateUrl: './viewmap.component.html',
    styleUrls: ['./viewmap.component.css']
})
export class ViewmapComponent implements OnInit {

    positions = [];

    constructor() { }

    ngOnInit() {
//        jQuery('body,html').animate({ scrollTop: 0 }, 800);
        jQuery('html, body').animate({ scrollTop: jQuery('#banner-map').offset().top -120 }, 500, 'linear');

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

        this.showRandomMarkers();
    }

    private showRandomMarkers() {
        let randomLat: number, randomLng: number;
        this.positions = [];
        for (let i = 0; i < 9; i++) {
            randomLat = Math.random() * 0.0099 + 43.7250;
            randomLng = Math.random() * 0.0099 + -79.7699;
            this.positions.push([randomLat, randomLng]);
        }
    }
    private addMarker() {
        let randomLat = Math.random() * 0.0099 + 43.7250;
        let randomLng = Math.random() * 0.0099 + -79.7699;
        this.positions.push([randomLat, randomLng]);
    }

    private showInfoWindow(t) {
        var e = t.target;
        e.ng2MapComponent.openInfoWindow("iw", e, {
            lat: e.getPosition().lat(),
            lng: e.getPosition().lng()
        })
    }

}
