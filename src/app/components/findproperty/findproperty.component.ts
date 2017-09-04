import { Component, OnInit } from '@angular/core';
declare var jQuery: any;

@Component({
  selector: 'app-findproperty',
  templateUrl: './findproperty.component.html',
  styleUrls: ['./findproperty.component.css']
})
export class FindpropertyComponent implements OnInit {

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

}
