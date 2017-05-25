import { Component, OnInit } from '@angular/core';
declare var jQuery: any;

@Component({
    selector: 'app-whatwedo',
    templateUrl: './whatwedo.component.html',
    styleUrls: ['./whatwedo.component.css']
})
export class WhatwedoComponent implements OnInit {

    constructor() { }

    ngOnInit() {
        jQuery('body,html').animate({ scrollTop: 0 }, 800);
        jQuery(".skills li").each(function() {
            jQuery(this).appear(function() {
                jQuery(this).animate({
                    opacity: 1,
                    left: "0px"
                }, 800);
                var b = jQuery(this).find(".progress-bar").attr("data-width");
                jQuery(this).find(".progress-bar").animate({
                    width: b + "%"
                }, 1300, "linear");
            });
        });
    }

}
