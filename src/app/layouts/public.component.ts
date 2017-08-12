import { Component, OnInit, HostListener } from '@angular/core';
import '../../../node_modules/wowjs/dist/wow.min.js';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
declare var jQuery: any;
declare var WOW: any;


@Component({
    selector: 'public-root',
    templateUrl: './public.component.html',
    //  styleUrls: ['./public.component.css']
})

export class PublicComponent implements OnInit{

    amountScrolled: number = 700;

    constructor(
        private router: Router,
        private app: AppComponent
    ) {
//        this.auth.logIn();
    }

    @HostListener('window:scroll', ['$event'])
    ngOnScroll(event) {
        if (jQuery(window).scrollTop() > this.amountScrolled) {
            jQuery("a.back-to").fadeIn("slow");
        } else {
            jQuery("a.back-to").fadeOut("slow");
        }
    }

    scroolTop() {
        jQuery("html, body").animate({
            scrollTop: 0
        }, 700);
        return false;
    }

    ngOnInit() {
        jQuery.backstretch("destroy");
        console.log("public component");
        //        jQuery('.nav-button').on("click", function() {
        //            if (jQuery(this).hasClass('active')) {
        //                jQuery(this).removeClass('active').parent().find('.navigation').removeClass('active');
        //            } else {
        //                jQuery(this).addClass('active').parent().find('.navigation').addClass('active');
        //            }
        //        });
        //
        //        jQuery('.lines-button').on("click", function() {
        //            if (jQuery(this).hasClass('active')) {
        //                jQuery(this).removeClass('active').parent().find('.navigation').removeClass('active');
        //            } else {
        //                jQuery(this).addClass('active').parent().find('.navigation').addClass('active');
        //            }
        //        });
        //        var wow = new WOW();
        //        wow.init();
        //        console.log(this.auth.checkAuth);
        (function($) {
            "use strict";
            //------- BACK TO TOP ------- 
            var amountScrolled = 700;
            var backBtn = $("a.back-to");
            $(window).on("scroll", function() {
                if ($(window).scrollTop() > amountScrolled) {
                    backBtn.fadeIn("slow");
                } else {
                    backBtn.fadeOut("slow");
                }
            });
            backBtn.on("click", function() {
                $("html, body").animate({
                    scrollTop: 0
                }, 700);
                return false;
            });


            // -------  Push Menus ------- 
            var $menuLeft = $(".pushmenu-left");
            var $menuRight = $(".pushmenu-right");
            var $toggleleft = $("#menu_bars.left");
            var $toggleright = $("#menu_bars.right");
            var pushbody = $(".pushmenu-push");
            $toggleleft.on("click", function() {
                $(this).toggleClass("active");
                pushbody.toggleClass("pushmenu-push-toright");
                $menuLeft.toggleClass("pushmenu-open");
                return false;
            });
            $toggleright.on("click", function() {
                $(this).toggleClass("active");
                pushbody.toggleClass("pushmenu-push-toleft");
                $menuRight.toggleClass("pushmenu-open");
                return false;
            });

            // -------  push DropDowns 
            var side_drop = $(".push_nav .dropdown");
            side_drop.on("show.bs.dropdown", function(e) {
                $(this).find(".dropdown-menu").first().stop(true, true).slideDown();
            });
            side_drop.on("hide.bs.dropdown", function(e) {
                $(this).find(".dropdown-menu").first().stop(true, true).slideUp();
            });


            // -------  SEARCH FORM DROPDOWNS
//            $(setup);
//
//            function setup() {
//                $(".intro select").zelect({})
//            }


            // -------  SKILLS BAR ------- 
            $(".skills li").each(function() {
                $(this).appear(function() {
                    $(this).animate({
                        opacity: 1,
                        left: "0px"
                    }, 800);
                    var b = jQuery(this).find(".progress-bar").attr("data-width");
                    $(this).find(".progress-bar").animate({
                        width: b + "%"
                    }, 1300, "linear");
                });
            });


            // ------- RANG Slider
//            $(".selectbox").selectbox();
//            $(".nstSlider").nstSlider({
//                "left_grip_selector": ".leftGrip",
//                "right_grip_selector": ".rightGrip",
//                "value_bar_selector": ".bar",
//                "value_changed_callback": function(cause, leftValue, rightValue) {
//                    $(this).parent().find(".leftLabel").text(leftValue);
//                    $(this).parent().find(".rightLabel").text(rightValue);
//                }
//            });


            // -------  FANCY BOX -------                 
            $(".fancybox").fancybox({
                openEffect: 'elastic',
                openSpeed: 650,
                closeEffect: 'fade',
                closeClick: true,
            });


            // -------  CHECK BOX ------- 
            $('input[name="radio-btn"]').wrap('<div class="radio-btn"><i></i></div>');
            $(".radio-btn").on('click', function() {
                var _this = $(this),
                    block = _this.parent().parent();
                block.find('input:radio').attr('checked', false);
                block.find(".radio-btn").removeClass('checkedRadio');
                _this.addClass('checkedRadio');
                _this.find('input:radio').attr('checked', true);
            });
            $('input[name="check-box"]').wrap('<div class="check-box"><i></i></div>');
            $.fn.toggleCheckbox = function() {
                this.attr('checked', !this.attr('checked'));
            }
            $('.check-box').on('click', function() {
                $(this).find(':checkbox').toggleCheckbox();
                $(this).toggleClass('checkedBox');
            });



            // -------  For Team Icon Effect ------- 
//            $('a[href=".team"]').on("click", function(event) {
//                event.preventDefault();
//                $("#team").addClass("open");
//                $("#team > form > input[type='search']").focus();
//            });
//            $("#team, #team button.close").on("click keyup", function(event) {
//                if (event.target == this || event.target.className == 'close' || event.keyCode == 27) {
//                    $(this).removeClass('open');
//                }
//            });


            // ------- equalise Columns
            $(".item").each(function() {
                var highestBox = 0;
                $(".col-md-6", this).each(function() {
                    if ($(this).height() > highestBox) {
                        highestBox = $(this).height();
                    }
                });
                $(".col-md-6", this).height(highestBox);

            });


            // -------  Toggle Button For More options ------- 
            $(".show-hide-detail").hide();
            $(".show-hide-detail:first").show();
            $(".show-hide-btn a").on('click', function() {
                var thid_data = $(this).attr('data-id');
                $(".show-hide-btn a").removeClass('active');
                $(this).addClass('active');
                if (!$("#" + thid_data).is(":visible")) {
                    $(".show-hide-detail").hide();
                    $("#" + thid_data).show();
                }
            });



            // ------- OWL SLIDER -------

            //PARTNERS
            $("#partner_slider").owlCarousel({
                autoPlay: 4000,
                items: 6,
                navigation: false,
                pagination: false,
                itemsDesktop: [1199, 4],
                itemsDesktopSmall: [979, 4]
            });

            //ABOUT US
            $("#about_single").owlCarousel({
                autoPlay: true,
                singleItem: true,
                navigation: false,
            });
            // AGENT SLIDER - 2
            $("#agent-2-slider, #agent-3-slider, #agent-4-slider").owlCarousel({
                autoPlay: 3000,
                singleItem: true,
                pagination: false,
                navigation: true,
                navigationText: [
                    "<i class='fa fa-angle-left'></i>",
                    "<i class='fa fa-angle-right'></i>"
                ],
            });

            // AGENT SLIDER - 2
            $("#nav_slider").owlCarousel({
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

            //HOME SLIDER - 2/3
            $('#main-slider.carousel').carousel({
                interval: 8000,
                singleItem: true,
                transitionStyle: "fade"
            });


            //RECENT SLIDER HOME 2/3
            $("#property-listing-slider, #ide_team").owlCarousel({
                autoPlay: 3000,
                items: 2,
                pagination: false,
                navigation: true,
                navigationText: [
                    "<i class='fa fa-angle-left'></i>",
                    "<i class='fa fa-angle-right'></i>"
                ],
            });

            //PARTNERS HOME - 2/3
//            $("#partner_slider_2").owlCarousel({
//                autoPlay: 4000,
//                items: 6,
//                navigation: false,
//                pagination: true,
//                itemsDesktop: [1199, 4],
//                itemsDesktopSmall: [979, 4]
//            });
            var sync1 = $("#property-d-1");
            var sync2 = $("#property-d-1-2");

            sync1.owlCarousel({
                autoPlay: 3000,
                singleItem: true,
                slideSpeed: 1000,
                navigation: true,
                pagination: false,
                navigationText: [
                    "<i class='fa fa-angle-left'></i>",
                    "<i class='fa fa-angle-right'></i>"
                ],
                afterAction: syncPosition,
                responsiveRefreshRate: 200,
            });

            $("#owl-testimonial-1").owlCarousel({
                autoPlay: true,
                items: 1,
                navigation: false,
            });

            sync2.owlCarousel({
                items: 5,
                itemsDesktop: [1199, 10],
                itemsDesktopSmall: [979, 10],
                itemsTablet: [768, 8],
                itemsMobile: [479, 4],
                pagination: false,
                responsiveRefreshRate: 100,
                afterInit: function(el) {
                    el.find(".owl-item").eq(0).addClass("synced");
                }
            });

            function syncPosition(el) {
                var current = this.currentItem;
                $("#property-d-1-2")
                    .find(".owl-item")
                    .removeClass("synced")
                    .eq(current)
                    .addClass("synced")
                if ($("#property-d-1-2").data("owlCarousel") !== undefined) {
                    center(current)
                }
            }

            $("#property-d-1-2").on("click", ".owl-item", function(e) {
                e.preventDefault();
                var number = $(this).data("owlItem");
                sync1.trigger("owl.goTo", number);
            });

            function center(number) {
                var sync2visible = sync2.data("owlCarousel").owl.visibleItems;
                var num = number;
                var found = false;
                for (var i in sync2visible) {
                    if (num === sync2visible[i]) {
                        var found = true;
                    }
                }

                if (found === false) {
                    if (num > sync2visible[sync2visible.length - 1]) {
                        sync2.trigger("owl.goTo", num - sync2visible.length + 2)
                    } else {
                        if (num - 1 === -1) {
                            num = 0;
                        }
                        sync2.trigger("owl.goTo", num);
                    }
                } else if (num === sync2visible[sync2visible.length - 1]) {
                    sync2.trigger("owl.goTo", sync2visible[1])
                } else if (num === sync2visible[0]) {
                    sync2.trigger("owl.goTo", num - 1)
                }

            }


//            $("#property-1-slider, #listing_slider").owlCarousel({
//                autoPlay: false,
//                items: 2,
//                pagination: false,
//                navigation: true,
//                navigationText: [
//                    "<i class='fa fa-angle-left'></i>",
//                    "<i class='fa fa-angle-right'></i>"
//                ],
//                itemsMobile: [480, 1],
//            });


//            $("#our-agent-slider").owlCarousel({
//                autoPlay: 3000,
//                items: 3,
//                pagination: true,
//                navigation: false,
//                itemsDesktop: [1199, 3],
//                itemsDesktopSmall: [979, 2],
//                itemsTablet: [768, 2],
//                itemsMobile: [480, 1],
//            });


            $("#our-partner-slider").owlCarousel({
                autoPlay: 3000,
                items: 5,
                navigation: false,
                pagination: false,
                itemsDesktop: [1199, 3],
                itemsDesktopSmall: [979, 3]
            });


            // ------- Revolution -------
            //Main Slider Home 
            var revapi = jQuery("#rev_slider_3").revolution({
                sliderType: "standard",
                sliderLayout: "fullwidth",
                scrollbarDrag: "true",
                spinner: "off",
                delay: 3000,
                navigation: {
                    arrows: {
                        enable: true
                    }
                },
                touch: {
                    touchenabled: "on",
                    swipe_threshold: 75,
                    swipe_min_touches: 1,
                    swipe_direction: "horizontal",
                    drag_block_vertical: false
                },
                responsiveLevels: [1240, 1024, 778, 480],
                gridwidth: [1170, 992, 767, 480],
                gridheight: [750, 650, 550, 400],
            });


            //Fullscreen
//            var revapi = jQuery("#rev_full").revolution({
//                sliderType: "standard",
//                scrollbarDrag: "true",
//                spinner: "off",
//                sliderLayout: "fullscreen",
//                delay: 3000,
//                navigation: {
//                    arrows: {
//                        enable: true
//                    }
//                },
//                responsiveLevels: [4096, 1024, 778, 480],
//                gridwidth: [1170, 960, 750, 480],
//                gridheight: [720, 600, 500, 300],
//            });

            //Video Background
            var revapi = jQuery("#rev_video").revolution({
                sliderType: "standard",
                sliderLayout: "fullwidth",
                delay: 9000,
                spinner: "off",
                navigation: {
                    arrows: {
                        enable: true
                    }
                },
                gridwidth: 1170,
                gridheight: 700
            });


            // ------- CUBEPORTFOLIO -------
            //PROJECT FILTER
            $("#projects").cubeportfolio({
                filters: "#project-filter",
                layoutMode: "grid",
                defaultFilter: "*",
                animationType: "slideDelay",
                gapHorizontal: 30,
                gapVertical: 30,
                gridAdjustment: "responsive",
                lightboxDelegate: ".cbp-lightbox",
                lightboxGallery: true,
            });

            //with no space
            $("#nospace").cubeportfolio({
                filters: "#nospace-filter",
                layoutMode: "grid",
                defaultFilter: "*",
                animationType: "slideDelay",
                gapHorizontal: 0,
                gapVertical: 0,
                gridAdjustment: 'responsive',
                mediaQueries: [{
                    width: 1500,
                    cols: 3
                }, {
                    width: 1100,
                    cols: 3
                }, {
                    width: 800,
                    cols: 3
                }, {
                    width: 480,
                    cols: 2
                }, {
                    width: 320,
                    cols: 1
                }],
                lightboxDelegate: ".cbp-lightbox",
                lightboxGallery: true,
            });

            // (Testinomial Page)
            $('#js-grid-masonry').cubeportfolio({
                layoutMode: 'grid',
                gapHorizontal: 50,
                gapVertical: 20,
                gridAdjustment: 'responsive',
                mediaQueries: [{
                    width: 1500,
                    cols: 3
                }, {
                    width: 1100,
                    cols: 3
                }, {
                    width: 800,
                    cols: 3
                }, {
                    width: 480,
                    cols: 2
                }, {
                    width: 320,
                    cols: 1
                }],

            });


            // ------- PARALLAX  -------
            $("#image-text").parallax("50%", 0.02);
            $(".page-main-section").parallax("50%", 0.02);
            $("#estimate").parallax("50%", 0.01);
            $(".info_section").parallax("50%", 0.01);
        } (jQuery));
        (function($) {
            "use strict";

            var bootsnav = {
                initialize: function() {
                    this.event();
                    this.hoverDropdown();
                    this.navbarSticky();
                    this.navbarScrollspy();
                },
                event: function() {

                    // ------------------------------------------------------------------------------ //
                    // Variable
                    // ------------------------------------------------------------------------------ //
                    var getNav = $("nav.navbar.bootsnav");

                    // ------------------------------------------------------------------------------ //
                    // Navbar Sticky 
                    // ------------------------------------------------------------------------------ //
                    var navSticky = getNav.hasClass("navbar-sticky");
                    if (navSticky) {
                        // Wraped navigation
                        getNav.wrap("<div class='wrap-sticky'></div>");
                    }

                    // ------------------------------------------------------------------------------ //
                    // Navbar Center 
                    // ------------------------------------------------------------------------------ //
                    if (getNav.hasClass("brand-center")) {
                        var postsArr = new Array(),
                            index = $("nav.brand-center"),
                            $postsList = index.find('ul.navbar-nav');

                        //Create array of all posts in lists
                        index.find('ul.navbar-nav > li').each(function() {
                            postsArr.push($(this).html());
                        });

                        //Split the array at this point. The original array is altered.
                        var firstList = postsArr.splice(0, Math.round(postsArr.length / 2)),
                            secondList = postsArr,
                            ListHTML = '';

                        var createHTML = function(list) {
                            ListHTML = '';
                            for (var i = 0; i < list.length; i++) {
                                ListHTML += '<li>' + list[i] + '</li>'
                            }
                        }

                        //Generate HTML for first list
                        createHTML(firstList);
                        $postsList.html(ListHTML);
                        index.find("ul.nav").first().addClass("navbar-left");

                        //Generate HTML for second list
                        createHTML(secondList);
                        //Create new list after original one
                        $postsList.after('<ul class="nav navbar-nav"></ul>').next().html(ListHTML);
                        index.find("ul.nav").last().addClass("navbar-right");

                        //Wrap navigation menu
                        index.find("ul.nav.navbar-left").wrap("<div class='col-half left'></div>");
                        index.find("ul.nav.navbar-right").wrap("<div class='col-half right'></div>");

                        //Selection Class
                        index.find('ul.navbar-nav > li').each(function() {
                            var dropDown = $("ul.dropdown-menu", this),
                                megaMenu = $("ul.megamenu-content", this);
                            dropDown.closest("li").addClass("dropdown");
                            megaMenu.closest("li").addClass("megamenu-fw");
                        });
                    }


                    // ------------------------------------------------------------------------------ //
                    // Navbar Sidebar 
                    // ------------------------------------------------------------------------------ //
                    if (getNav.hasClass("navbar-sidebar")) {
                        // Add Class to body
                        $("body").addClass("wrap-nav-sidebar");
                        getNav.wrapInner("<div class='scroller'></div>");
                    } else {
                        $(".bootsnav").addClass("on");
                    }

                    // ------------------------------------------------------------------------------ //
                    // Menu Center 
                    // ------------------------------------------------------------------------------ //
                    if (getNav.find("ul.nav").hasClass("navbar-center")) {
                        getNav.addClass("menu-center");
                    }

                    // ------------------------------------------------------------------------------ //
                    // Navbar Full
                    // ------------------------------------------------------------------------------ //
                    if (getNav.hasClass("navbar-full")) {
                        // Add Class to body
                        $("nav.navbar.bootsnav").find("ul.nav").wrap("<div class='wrap-full-menu'></div>");
                        $(".wrap-full-menu").wrap("<div class='nav-full'></div>");
                        $("ul.nav.navbar-nav").prepend("<li class='close-full-menu'><a href='#'><i class='fa fa-times'></i></a></li>");
                    } else if (getNav.hasClass("navbar-mobile")) {
                        getNav.removeClass("no-full");
                    } else {
                        getNav.addClass("no-full");
                    }

                    // ------------------------------------------------------------------------------ //
                    // Navbar Mobile
                    // ------------------------------------------------------------------------------ //
                    if (getNav.hasClass("navbar-mobile")) {
                        // Add Class to body
                        $('.navbar-collapse').on('shown.bs.collapse', function() {
                            $("body").addClass("side-right");
                        });
                        $('.navbar-collapse').on('hide.bs.collapse', function() {
                            $("body").removeClass("side-right");
                        });

                        $(window).on("resize", function() {
                            $("body").removeClass("side-right");
                        });
                    }

                    // ------------------------------------------------------------------------------ //
                    // Navbar Fixed
                    // ------------------------------------------------------------------------------ //
                    if (getNav.hasClass("no-background")) {
                        $(window).on("scroll", function() {
                            var scrollTop = $(window).scrollTop();
                            if (scrollTop > 34) {
                                $(".navbar-fixed").removeClass("no-background");
                                //                        $("#header-top").hide();
                            } else {
                                $(".navbar-fixed").addClass("no-background");
                                //                        $("#header-top").show('2500');
                            }
                        });
                    }

                    // ------------------------------------------------------------------------------ //
                    // Navbar Fixed
                    // ------------------------------------------------------------------------------ //
                    if (getNav.hasClass("navbar-transparent")) {
                        $(window).on("scroll", function() {
                            var scrollTop = $(window).scrollTop();
                            if (scrollTop > 34) {
                                $(".navbar-fixed").removeClass("navbar-transparent");
                            } else {
                                $(".navbar-fixed").addClass("navbar-transparent");
                            }
                        });
                    }

                    // ------------------------------------------------------------------------------ //
                    // Button Cart
                    // ------------------------------------------------------------------------------ //
                    $(".btn-cart").on("click", function(e) {
                        e.stopPropagation();
                    });

                    // ------------------------------------------------------------------------------ //
                    // Toggle Search
                    // ------------------------------------------------------------------------------ //
                    $("nav.navbar.bootsnav .attr-nav").each(function() {
                        $("li.search > a", this).on("click", function(e) {
                            e.preventDefault();
                            $(".top-search").slideToggle();
                        });
                    });
                    $(".input-group-addon.close-search").on("click", function() {
                        $(".top-search").slideUp();
                    });

                    // ------------------------------------------------------------------------------ //
                    // Toggle Side Menu
                    // ------------------------------------------------------------------------------ //
                    $("nav.navbar.bootsnav .attr-nav").each(function() {
                        $("li.side-menu > a", this).on("click", function(e) {
                            e.preventDefault();
                            $("nav.navbar.bootsnav > .side").toggleClass("on");
                            $("body").toggleClass("on-side");
                        });
                    });
                    $(".side .close-side").on("click", function(e) {
                        e.preventDefault();
                        $("nav.navbar.bootsnav > .side").removeClass("on");
                        $("body").removeClass("on-side");
                    });



                    // ------------------------------------------------------------------------------ //
                    // Wrapper
                    // ------------------------------------------------------------------------------ //
                    $("body").wrapInner("<div class='wrapper'></div>");
                },

                // ------------------------------------------------------------------------------ //
                // Change dropdown to hover on dekstop
                // ------------------------------------------------------------------------------ //
                hoverDropdown: function() {
                    var getNav = $("nav.navbar.bootsnav"),
                        getWindow = $(window).width(),
                        getHeight = $(window).height(),
                        getIn = getNav.find("ul.nav").data("in"),
                        getOut = getNav.find("ul.nav").data("out");

                    if (getWindow < 981) {

                        // Height of scroll navigation sidebar
                        $(".scroller").css("height", "auto");

                        // Disable mouseenter event
                        $("nav.navbar.bootsnav ul.nav").find("li.dropdown").off("mouseenter");
                        $("nav.navbar.bootsnav ul.nav").find("li.dropdown").off("mouseleave");
                        $("nav.navbar.bootsnav ul.nav").find(".title").off("mouseenter");
                        $("nav.navbar.bootsnav ul.nav").off("mouseleave");
                        $(".navbar-collapse").removeClass("animated");

                        // Enable click event
                        $("nav.navbar.bootsnav ul.nav").each(function() {
                            $(".dropdown-menu", this).addClass("animated");
                            $(".dropdown-menu", this).removeClass(getOut);

                            // Dropdown Fade Toggle
                            $("a.dropdown-toggle", this).off('click');
                            $("a.dropdown-toggle", this).on('click', function(e) {
                                e.stopPropagation();
                                $(this).closest("li.dropdown").find(".dropdown-menu").first().stop().fadeToggle().toggleClass(getIn);
                                $(this).closest("li.dropdown").first().toggleClass("on");
                                return false;
                            });

                            // Hidden dropdown action
                            $('li.dropdown', this).each(function() {
                                $(this).find(".dropdown-menu").stop().fadeOut();
                                $(this).on('hidden.bs.dropdown', function() {
                                    $(this).find(".dropdown-menu").stop().fadeOut();
                                });
                                return false;
                            });

                            // Megamenu style
                            $(".megamenu-fw", this).each(function() {
                                $(".col-menu", this).each(function() {
                                    $(".content", this).addClass("animated");
                                    $(".content", this).stop().fadeOut();
                                    $(".title", this).off("click");
                                    $(".title", this).on("click", function() {
                                        $(this).closest(".col-menu").find(".content").stop().fadeToggle().addClass(getIn);
                                        $(this).closest(".col-menu").toggleClass("on");
                                        return false;
                                    });

                                    $(".content", this).on("click", function(e) {
                                        e.stopPropagation();
                                    });
                                });
                            });
                        });

                        // Hidden dropdown
                        var cleanOpen = function() {
                            $('li.dropdown', this).removeClass("on");
                            $(".dropdown-menu", this).stop().fadeOut();
                            $(".dropdown-menu", this).removeClass(getIn);
                            $(".col-menu", this).removeClass("on");
                            $(".col-menu .content", this).stop().fadeOut();
                            $(".col-menu .content", this).removeClass(getIn);
                        }

                        // Hidden om mouse leave
                        $("nav.navbar.bootsnav").on("mouseleave", function() {
                            cleanOpen();
                        });

                        // Enable click atribute navigation
                        $("nav.navbar.bootsnav .attr-nav").each(function() {
                            $(".dropdown-menu", this).removeClass("animated");
                            $("li.dropdown", this).off("mouseenter");
                            $("li.dropdown", this).off("mouseleave");
                            $("a.dropdown-toggle", this).off('click');
                            $("a.dropdown-toggle", this).on('click', function(e) {
                                e.stopPropagation();
                                $(this).closest("li.dropdown").find(".dropdown-menu").first().stop().fadeToggle();
                                $(".navbar-toggle").each(function() {
                                    $(".fa", this).removeClass("fa-times");
                                    $(".fa", this).addClass("fa-bars");
                                    $(".navbar-collapse").removeClass("in");
                                    $(".navbar-collapse").removeClass("on");
                                });
                            });

                            $(this).on("mouseleave", function() {
                                $(".dropdown-menu", this).stop().fadeOut();
                                $("li.dropdown", this).removeClass("on");
                                return false;
                            });
                        });

                        // Toggle Bars
                        $(".navbar-toggle").each(function() {
                            $(this).off("click");
                            $(this).on("click", function() {
                                $(".fa", this).toggleClass("fa-bars");
                                $(".fa", this).toggleClass("fa-times");
                                cleanOpen();
                            });
                        });

                    } else if (getWindow > 981) {
                        // Height of scroll navigation sidebar
                        $(".scroller").css("height", getHeight + "px");

                        // Navbar Sidebar
                        if (getNav.hasClass("navbar-sidebar")) {
                            // Hover effect Sidebar Menu
                            $("nav.navbar.bootsnav ul.nav").each(function() {
                                $("a.dropdown-toggle", this).off('click');
                                $("a.dropdown-toggle", this).on('click', function(e) {
                                    e.stopPropagation();
                                });

                                $(".dropdown-menu", this).addClass("animated");
                                $("li.dropdown", this).on("mouseenter", function() {
                                    $(".dropdown-menu", this).eq(0).removeClass(getOut);
                                    $(".dropdown-menu", this).eq(0).stop().fadeIn().addClass(getIn);
                                    $(this).addClass("on");
                                    return false;
                                });

                                $(".col-menu").each(function() {
                                    $(".content", this).addClass("animated");
                                    $(".title", this).on("mouseenter", function() {
                                        $(this).closest(".col-menu").find(".content").stop().fadeIn().addClass(getIn);
                                        $(this).closest(".col-menu").addClass("on");
                                        return false;
                                    });
                                });

                                $(this).on("mouseleave", function() {
                                    $(".dropdown-menu", this).stop().removeClass(getIn);
                                    $(".dropdown-menu", this).stop().addClass(getOut).fadeOut();
                                    $(".col-menu", this).find(".content").stop().fadeOut().removeClass(getIn);
                                    $(".col-menu", this).removeClass("on");
                                    $("li.dropdown", this).removeClass("on");
                                    return false;
                                });
                            });
                        } else {
                            // Hover effect Default Menu
                            $("nav.navbar.bootsnav ul.nav").each(function() {
                                $("a.dropdown-toggle", this).off('click');
                                $("a.dropdown-toggle", this).on('click', function(e) {
                                    e.stopPropagation();
                                });

                                $(".megamenu-fw", this).each(function() {
                                    $(".title", this).off("click");
                                    $("a.dropdown-toggle", this).off("click");
                                    $(".content").removeClass("animated");
                                });

                                $(".dropdown-menu", this).addClass("animated");
                                $("li.dropdown", this).on("mouseenter", function() {
                                    $(".dropdown-menu", this).eq(0).removeClass(getOut);
                                    $(".dropdown-menu", this).eq(0).stop().fadeIn().addClass(getIn);
                                    $(this).addClass("on");
                                    return false;
                                });

                                $("li.dropdown", this).on("mouseleave", function() {
                                    $(".dropdown-menu", this).eq(0).removeClass(getIn);
                                    $(".dropdown-menu", this).eq(0).stop().fadeOut().addClass(getOut);
                                    $(this).removeClass("on");
                                });

                                $(this).on("mouseleave", function() {
                                    $(".dropdown-menu", this).removeClass(getIn);
                                    $(".dropdown-menu", this).eq(0).stop().fadeOut().addClass(getOut);
                                    $("li.dropdown", this).removeClass("on");
                                    return false;
                                });
                            });
                        }

                        // ------------------------------------------------------------------------------ //
                        // Hover effect Atribute Navigation
                        // ------------------------------------------------------------------------------ //
                        $("nav.navbar.bootsnav .attr-nav").each(function() {
                            $("a.dropdown-toggle", this).off('click');
                            $("a.dropdown-toggle", this).on('click', function(e) {
                                e.stopPropagation();
                            });

                            $(".dropdown-menu", this).addClass("animated");
                            $("li.dropdown", this).on("mouseenter", function() {
                                $(".dropdown-menu", this).eq(0).removeClass(getOut);
                                $(".dropdown-menu", this).eq(0).stop().fadeIn().addClass(getIn);
                                $(this).addClass("on");
                                return false;
                            });

                            $("li.dropdown", this).on("mouseleave", function() {
                                $(".dropdown-menu", this).eq(0).removeClass(getIn);
                                $(".dropdown-menu", this).eq(0).stop().fadeOut().addClass(getOut);
                                $(this).removeClass("on");
                            });

                            $(this).on("mouseleave", function() {
                                $(".dropdown-menu", this).removeClass(getIn);
                                $(".dropdown-menu", this).eq(0).stop().fadeOut().addClass(getOut);
                                $("li.dropdown", this).removeClass("on");
                                return false;
                            });
                        });
                    }

                    // ------------------------------------------------------------------------------ //
                    // Menu Fullscreen
                    // ------------------------------------------------------------------------------ //
                    if (getNav.hasClass("navbar-full")) {
                        var windowHeight = $(window).height(),
                            windowWidth = $(window).width();

                        $(".nav-full").css("height", windowHeight + "px");
                        $(".wrap-full-menu").css("height", windowHeight + "px");
                        $(".wrap-full-menu").css("width", windowWidth + "px");

                        $(".navbar-collapse").addClass("animated");
                        $(".navbar-toggle").each(function() {
                            var getId = $(this).data("target");
                            $(this).off("click");
                            $(this).on("click", function(e) {
                                e.preventDefault();
                                $(getId).removeClass(getOut);
                                $(getId).addClass("in");
                                $(getId).addClass(getIn);
                                return false;
                            });

                            $("li.close-full-menu").on("click", function(e) {
                                e.preventDefault();
                                $(getId).addClass(getOut);
                                setTimeout(function() {
                                    $(getId).removeClass("in");
                                    $(getId).removeClass(getIn);
                                }, 500);
                                return false;
                            });
                        });
                    }
                },

                // ------------------------------------------------------------------------------ //
                // Navbar Sticky
                // ------------------------------------------------------------------------------ //
                navbarSticky: function() {
                    var getNav = $("nav.navbar.bootsnav"),
                        navSticky = getNav.hasClass("navbar-sticky");

                    if (navSticky) {

                        // Set Height Navigation
                        var getHeight = getNav.height();
                        $(".wrap-sticky").height(getHeight);

                        // Windown on scroll
                        var getOffset = $(".wrap-sticky").offset().top;
                        $(window).on("scroll", function() {
                            var scrollTop = $(window).scrollTop();
                            if (scrollTop > getOffset) {
                                getNav.addClass("sticked");
                            } else {
                                getNav.removeClass("sticked");
                            }
                        });
                    }
                },

                // ------------------------------------------------------------------------------ //
                // Navbar Scrollspy
                // ------------------------------------------------------------------------------ //
                navbarScrollspy: function() {
                    var navScrollSpy = $(".navbar-scrollspy"),
                        $body = $('body'),
                        getNav = $('nav.navbar.bootsnav'),
                        offset = getNav.outerHeight();

                    if (navScrollSpy.length) {
                        $body.scrollspy({ target: '.navbar', offset: offset });

                        // Animation Scrollspy
                        $('.scroll').on('click', function(event) {
                            event.preventDefault();

                            // Active link
                            $('.scroll').removeClass("active");
                            $(this).addClass("active");

                            // Remove navbar collapse
                            $(".navbar-collapse").removeClass("in");

                            // Toggle Bars
                            $(".navbar-toggle").each(function() {
                                $(".fa", this).removeClass("fa-times");
                                $(".fa", this).addClass("fa-bars");
                            });

                            // Scroll
                            var scrollTop = $(window).scrollTop(),
                                $anchor = $(this).find('a'),
                                $section = $($anchor.attr('href')).offset().top,
                                $window = $(window).width(),
                                $minusDesktop = getNav.data("minus-value-desktop"),
                                $minusMobile = getNav.data("minus-value-mobile"),
                                $speed = getNav.data("speed");

                            if ($window > 992) {
                                var $position = $section - $minusDesktop;
                            } else {
                                var $position = $section - $minusMobile;
                            }

                            $('html, body').stop().animate({
                                scrollTop: $position
                            }, $speed);
                        });

                        // Activate Navigation
                        var fixSpy = function() {
                            var data = $body.data('bs.scrollspy');
                            if (data) {
                                offset = getNav.outerHeight();
                                data.options.offset = offset;
                                $body.data('bs.scrollspy', data);
                                $body.scrollspy('refresh');
                            }
                        }

                        // Activate Navigation on resize
                        var resizeTimer;
                        $(window).on('resize', function() {
                            clearTimeout(resizeTimer);
                            var resizeTimer = setTimeout(fixSpy, 200);
                        });
                    }
                }
            };

            // Initialize
            $(document).ready(function() {
                bootsnav.initialize();
            });

            // Reset on resize
            $(window).on("resize", function() {
                bootsnav.hoverDropdown();

                $(".top-search").slideUp();
                setTimeout(function() {
                    bootsnav.navbarSticky();
                }, 500);

                // Toggle Bars
                $(".navbar-toggle").each(function() {
                    $(".fa", this).removeClass("fa-times");
                    $(".fa", this).addClass("fa-bars");
                    $(this).removeClass("fixed");
                });
                $(".navbar-collapse").removeClass("in");
                $(".navbar-collapse").removeClass("on");
                $(".navbar-collapse").removeClass("bounceIn");
            });

        } (jQuery));
    }

    public logOut() {
        this.router.navigate(['/home']).catch(err => console.error(err));
        this.app.auth.logout();
    }
}
