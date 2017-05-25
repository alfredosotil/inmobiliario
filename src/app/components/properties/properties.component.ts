import { Component, OnInit } from '@angular/core';
declare var jQuery: any;

@Component({
    selector: 'app-properties',
    templateUrl: './properties.component.html',
    styleUrls: ['./properties.component.css']
})
export class PropertiesComponent implements OnInit {

    constructor() { }

    ngOnInit() {
        jQuery('body,html').animate({ scrollTop: 0 }, 800);
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
    }

}
