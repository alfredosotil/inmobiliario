import { Component, OnInit } from '@angular/core';
declare var jQuery: any;

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    constructor() { }

    ngOnInit() {
        jQuery('body,html').animate({ scrollTop: 0 }, 800);
        let revapi = jQuery("#rev_full").revolution({
            sliderType: "standard",
            scrollbarDrag: "true",
            spinner: "off",
            sliderLayout: "fullscreen",
            delay: 3000,
            navigation: {
                arrows: {
                    enable: true
                }
            },
            responsiveLevels: [4096, 1024, 778, 480],
            gridwidth: [1170, 960, 750, 480],
            gridheight: [720, 600, 500, 300],
        });
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
        jQuery("#listing_slider").owlCarousel({
            autoPlay: false,
            items: 2,
            pagination: false,
            navigation: true,
            navigationText: [
                "<i class='fa fa-angle-left'></i>",
                "<i class='fa fa-angle-right'></i>"
            ],
            itemsMobile: [480, 1],
        });
        jQuery("#property-2-slider").owlCarousel({
            autoPlay: 3000,
            items: 3,
            pagination: false,
            navigation: true,
            navigationText: [
                "<i class='fa fa-angle-left'></i>",
                "<i class='fa fa-angle-right'></i>"
            ],
            itemsDesktopSmall: [1024, 2],
            itemsTablet: [768, 2],
            itemsMobile: [479, 1],
        });
        jQuery("#partner_slider_2").owlCarousel({
            autoPlay: 4000,
            items: 6,
            navigation: false,
            pagination: true,
            itemsDesktop: [1199, 4],
            itemsDesktopSmall: [979, 4]
        });

    }

}
