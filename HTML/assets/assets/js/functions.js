/*------------------------------------
	Theme Name: Kodra
	Start Date :
	End Date : 
	Last change: 
	Version: 1.0
	Assigned to:
	Primary use:
---------------------------------------*/
/*	

	+ Blog Masonry
	+ Responsive Caret*
	+ Expand Panel Resize*
	+ Sticky Menu*
	
	+ Document On Ready
		- Scrolling Navigation*
		- Set Sticky Menu*
		- Responsive Caret*
		- Expand Panel*
		- Collapse Panel*
		- Revolution Slider
		- Quick Contact Form*
	
	+ Window On Scroll
		- Set Sticky Menu
		
	+ Window On Resize
		- Expand Panel Resize
		
	+ Window On Load
		- Site Loader
		- Largest Post
		
*/

(function($) {

	"use strict"
		
	function sidebar() {
		var width = $(window).width();
		var height = $(window).height();
		
		$(".sidebar-menu").removeAttr("style");
		$(".main-container").removeAttr("style");
		var main_height = $(".main-container").height();		
		var sidebar_height = $(".sidebar-menu").height();

		if ( width >= 992 ){			
			if( main_height > sidebar_height ) {
				$(".sidebar-menu").css("height",main_height);
			} else if( sidebar_height > height ){
				$(".main-container").css("height",sidebar_height);
				$(".sidebar-menu").css("height",sidebar_height);
			} else {
				$(".sidebar-menu").css("height",height);
			}
		} else {
			$(".sidebar-menu").css("height","auto");
			$(".main-container").css("height","auto");
		}
	}
	
	/* + Portfolio */
	function portfolio() {
		if($(".portfolio-list").length) {
			var $container = $(".portfolio-list");
			$container.isotope({
				layoutMode: 'fitRows',
				percentPosition: true,				
				itemSelector: ".portfolio-box"
			});
			
			$("#filters a").on("click",function(){
				$('#filters a').removeClass("active");
				$(this).addClass("active");
				var selector = $(this).attr("data-filter");
				$container.isotope({ filter: selector });
				return false;
			});
		}
	}
	
	/* + Slider Height */
	function slider_height() {
		var height = $(window).height();
		$(".slider-section-2").css("height", height);
		$(".slider-section-2 .carousel-item img").css("height", height);
	}
	
	/* + Responsive Caret* */
	function menu_dropdown_open(){
		var width = $(window).width();
		if($(".ownavigation .navbar-nav li.ddl-active").length ) {
			if( width > 991 ) {
				$(".ownavigation .navbar-nav > li").removeClass("ddl-active");
				$(".ownavigation .navbar-nav li .dropdown-menu").removeAttr("style");
			}
		} else {
			$(".ownavigation .navbar-nav li .dropdown-menu").removeAttr("style");
		}
	}
	
	/* + Expand Panel Resize* */
	function panel_resize(){
		var width = $(window).width();
		if( width > 991 ) {
			if($(".header_s .slidepanel").length ) {
				$(".header_s .slidepanel").removeAttr("style");
			}
		}
	}

	/* + Sticky Menu* */
	function sticky_menu() {
		var menu_scroll = $("body").offset().top;
		var scroll_top = $(window).scrollTop();
		var height = $(window).height();
		var body_height = $("body").height();
		var header_height = $(".header-fix").height();
		var a = height + header_height + header_height;
		if( body_height > a  ){	
			if ( scroll_top > menu_scroll ) {
				$(".header-fix").addClass("fixed-top animated fadeInDown");
				$("body").css("padding-top",header_height);
			} else {
				$(".header-fix").removeClass("fixed-top animated fadeInDown"); 
				$("body").css("padding-top","0");
			}
		} else {
			$(".header-fix").removeClass("fixed-top animated fadeInDown"); 
			$("body").css("padding-top","0");
		}
	}
	
	/* + Google Map* */
	function initialize(obj) {
		var lat = $("#"+obj).attr("data-lat");
        var lng = $("#"+obj).attr("data-lng");
		var contentString = $("#"+obj).attr("data-string");
		var myLatlng = new google.maps.LatLng(lat,lng);
		var map, marker, infowindow;
		var image = "assets/images/pointer.png";
		var zoomLevel = parseInt($("#"+obj).attr("data-zoom") ,10);		
		var styles = [{"featureType": "administrative.land_parcel","elementType": "all","stylers": [{"visibility": "off"}]},
					{"featureType": "landscape.man_made","elementType": "all","stylers": [{"visibility": "off"}]},
					{"featureType": "poi","elementType": "labels","stylers": [{"visibility": "off"}]},
					{"featureType": "road","elementType": "labels","stylers": [{"visibility": "simplified"},{"lightness": 20}]},
					{"featureType": "road.highway","elementType": "geometry","stylers": [{"hue": "#f49935"}]},
					{"featureType": "road.highway","elementType": "labels","stylers": [{"visibility": "simplified"}]},
					{"featureType": "road.arterial","elementType": "geometry","stylers": [{"hue": "#fad959"}]},
					{"featureType": "road.arterial","elementType": "labels","stylers": [{"visibility": "off"}]},
					{"featureType": "road.local","elementType": "geometry","stylers": [{"visibility": "simplified"}]},
					{"featureType": "road.local","elementType": "labels","stylers": [{"visibility": "simplified"}]},
					{"featureType": "transit","elementType": "all","stylers": [{"visibility": "off"}]},
					{"featureType": "water","elementType": "all","stylers": [{"hue": "#a1cdfc"},{"saturation": 30},{"lightness": 49}]}]
					  
		var styledMap = new google.maps.StyledMapType(styles,{name: "Styled Map"});	
		
		var mapOptions = {
			zoom: zoomLevel,
			disableDefaultUI: true,
			center: myLatlng,
            scrollwheel: false,
			mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP, "map_style"]
			}
		}
		
		map = new google.maps.Map(document.getElementById(obj), mapOptions);	
		
		map.mapTypes.set("map_style", styledMap);
		map.setMapTypeId("map_style");
		
		if( contentString != "" ) {
			infowindow = new google.maps.InfoWindow({
				content: contentString
			});
		}		
	    
        marker = new google.maps.Marker({
			position: myLatlng,
			map: map,
			icon: image
		});

		google.maps.event.addListener(marker, "click", function() {
			infowindow.open(map,marker);
		});
	}
	
	/* + Document On Ready */
	$(document).on("ready", function() {

		/* - Scrolling Navigation* */
		var width	=	$(window).width();
		var height	=	$(window).height();
		
		/* - Set Sticky Menu* */
		if( $(".header-fix").length ) {
			sticky_menu();
		}
		
		$('.navbar-nav li a[href*="#"]:not([href="#"]), .site-logo a[href*="#"]:not([href="#"])').on("click", function(e) {
	
			var $anchor = $(this);
			
			$("html, body").stop().animate({ scrollTop: $($anchor.attr("href")).offset().top - 49 }, 1500, "easeInOutExpo");
			
			e.preventDefault();
		});

		/* - Responsive Caret* */
		$(".ddl-switch").on("click", function() {
			var li = $(this).parent();
			if ( li.hasClass("ddl-active") || li.find(".ddl-active").length !== 0 || li.find(".dropdown-menu").is(":visible") ) {
				li.removeClass("ddl-active");
				li.children().find(".ddl-active").removeClass("ddl-active");
				li.children(".dropdown-menu").slideUp();
			}
			else {
				li.addClass("ddl-active");
				li.children(".dropdown-menu").slideDown();
			}
		});
		
		/* - Expand Panel* */
		$( "[id*='slideit-']" ).each(function (index) { 
			index++;
			$("[id*='slideit-"+index+"']").on("click", function() {
				$("[id*='slidepanel-"+index+"']").slideDown(1000);
				$("header").animate({ scrollTop: 0 }, 1000);
			});
		});

		/* - Collapse Panel * */
		$( "[id*='closeit-']" ).each(function (index) {
			index++;			
			$("[id*='closeit-"+index+"']").on("click", function() {
				$("[id*='slidepanel-"+index+"']").slideUp("slow");			
				$("header").animate({ scrollTop: 0 }, 1000);
			});
		});
		
		/* Switch buttons from "Log In | Register" to "Close Panel" on click * */
		$( "[id*='toggle-']" ).each(function (index) { 
			index++;
			$("[id*='toggle-"+index+"'] a").on("click", function() {
				$("[id*='toggle-"+index+"'] a").toggle();
			});
		});
		
		/* - Back To Top */
		$("#back-to-top").on("click",function()
		{
			$("body,html").animate(
			{
				scrollTop : 0 // Scroll to top of body
			},2000);
		});
		
		panel_resize();
		
		if($(".sidebar-menu").length) {
			sidebar();
			$(".filter-menu").empty();
			$(".footer-detail").empty();
			var ftr = $(".footer-main").clone();
			var portfolio_category = $("#portfolio-category").clone();
			$(".filter-menu").html(portfolio_category);
			$(".footer-detail").html(ftr);
		}

		/* - Portfolio */
		if($(".portfolio-box").length){
			var url;
			$(".portfolio-box .portfolio-detail > .portfolio-links").magnificPopup({
				delegate: " > a.zoom",
				type: "image",
				tLoading: "Loading image #%curr%...",
				mainClass: "mfp-img-mobile",
				gallery: {
					enabled: true,
					navigateByImgClick: false,
					preload: [0,1] // Will preload 0 - before current, and 1 after the current image
				},
				image: {
					tError: "<a href="%url%">The image #%curr%</a> could not be loaded.",				
				}
			});
		}
		if($(".work-box").length){
			var url;
			$(".work-box ul li").magnificPopup({
				delegate: " > a.zoom",
				type: "image",
				tLoading: "Loading image #%curr%...",
				mainClass: "mfp-img-mobile",
				gallery: {
					enabled: true,
					navigateByImgClick: false,
					preload: [0,1] // Will preload 0 - before current, and 1 after the current image
				},
				image: {
					tError: "<a href="%url%">The image #%curr%</a> could not be loaded.",				
				}
			});
		}		
		
		/* - Revolution Slider */
		if($("#kodra-slider").length){
			var tpj=jQuery;
			var revapi19;
			if(tpj("#kodra-slider").revolution === undefined){
				revslider_showDoubleJqueryError("#kodra-slider");
			}else{
				revapi19 = tpj("#kodra-slider").show().revolution({
					sliderType:"standard",
					sliderLayout:"auto",
					dottedOverlay:"none",
					delay:9000,
					navigation: {
						keyboardNavigation:"off",
						keyboard_direction: "horizontal",
						mouseScrollNavigation:"off",
						mouseScrollReverse:"default",
						onHoverStop:"off",
						arrows: {
							style:"custom",
							enable:true,
							hide_onmobile:false,
							hide_onleave:false,
							tmp:'',
							left: {
								h_align:"right",
								v_align:"top",
								h_offset:30,
								v_offset:60
							},
							right: {
								h_align:"right",
								v_align:"top",
								h_offset:30,
								v_offset:30
							}
						}
					},
					responsiveLevels:[1920,1200,768,480],
					visibilityLevels:[1920,1200,768,480],
					gridwidth:[925,925,768,480],
					gridheight:[571,571,450,400],
					lazyType:"none",
					shadow:0,
					spinner:"spinner0",
					stopLoop:"off",
					stopAfterLoops:-1,
					stopAtSlide:-1,
					shuffle:"off",
					autoHeight:"off",
					disableProgressBar:"on",
					hideThumbsOnMobile:"off",
					hideSliderAtLimit:0,
					hideCaptionAtLimit:0,
					hideAllCaptionAtLilmit:0,
					debugMode:false,
					fallbacks: {
						simplifyAll:"off",
						nextSlideOnWindowFocus:"off",
						disableFocusListener:false,
					}
				});
			}
		}		
		
		slider_height();
		
		portfolio();
		
		/* - Skill Section */
		$( " [id*='skill_type-'] " ).each(function ()
		{
			var ele_id = 0;
			ele_id = $(this).attr('id').split("-")[1];
			
			var $this = $(this);
			var myVal = $(this).data("value");

			$this.appear(function()
			{			
				var skill_type1_item_count = 0;
				var skill_type1_count = 0;					
				skill_type1_item_count = $( "[id*='skill_"+ ele_id +"_count-']" ).length;				
				
				for(var i=1; i<=skill_type1_item_count; i++)
				{
					skill_type1_count = $( "[id*='skill_"+ ele_id +"_count-"+i+"']" ).attr( "data-skill_percent" );
					$("[id*='skill_"+ ele_id +"_count-"+i+"']").animateNumber({ number: skill_type1_count }, 3000);
				}
				
				var skill_bar_count = 0;
				var skills_bar_count = 0;
				skill_bar_count = $( "[id*='skill_bar_"+ ele_id +"_count-']" ).length;
				
				for(var j=1; j<=skill_bar_count; j++)
				{
					skills_bar_count = $( "[id*='skill_"+ ele_id +"_count-"+j+"']" ).attr( "data-skill_percent" );
					$("[id*='skill_bar_"+ ele_id +"_count-"+j+"']").css({'width': skills_bar_count +'%'});
				}
			});
		});

		/* - Category Carousel */
		if( $(".category-carousel").length ) {
			$(".category-carousel").owlCarousel({
				loop: true,
				margin: 30,
				nav: false,
				dots: true,
				autoplay: false,
				responsive:{
					0:{
						items: 1
					},
					477:{
						items: 2
					},
					768:{
						items: 3
					},
					992:{
						items: 4
					}
				}
			});
		}
		
		if( $( "#contact-map-canvas").length === 1 ) {
			initialize( "contact-map-canvas" );
		}

		/* - Quick Contact Form* */
		$( "#btn_submit" ).on( "click", function(event) {
			event.preventDefault();
			var mydata = $("form").serialize();
			$.ajax({
				type: "POST",
				dataType: "json",
				url: "contact.php",
				data: mydata,
				success: function(data) {
					if( data["type"] === "error" ){
						$("#alert-msg").html(data["msg"]);
						$("#alert-msg").removeClass("alert-msg-success");
						$("#alert-msg").addClass("alert-msg-failure");
						$("#alert-msg").show();
					} else {
						$("#alert-msg").html(data["msg"]);
						$("#alert-msg").addClass("alert-msg-success");
						$("#alert-msg").removeClass("alert-msg-failure");
						$("#input_name").val("");
						$("#input_email").val("");
						$("#input_phone").val("");
						$("#textarea_message").val("");
						$("#alert-msg").show();
					}		
				},
				error: function(xhr, textStatus, errorThrown) {
					alert(textStatus);
				}
			});
		});
		
	});	/* - Document On Ready /- */
	
	/* + Window On Scroll */
	$(window).on("scroll",function() {
		/* - Set Sticky Menu* */
		if( $(".header-fix").length ) {
			sticky_menu();
		}
	});
	
	/* + Window On Resize */ 
	$( window ).on("resize",function() {
		var width	=	$(window).width();
		var height	=	$(window).height();
		
		sticky_menu();
		
		/* - Expand Panel Resize */
		panel_resize();
		menu_dropdown_open();
		
		if( width < 992 ) {
			$(".filter-menu").empty();
			$(".footer-detail").empty();
		} else{
			$(".filter-menu").empty();
			$(".footer-detail").empty();
			var ftr = $(".footer-main").clone();
			var portfolio_category = $("#portfolio-category").clone();
			$(".filter-menu").html(portfolio_category);
			$(".footer-detail").html(ftr);
		}
		
		if($(".sidebar-menu").length) {
			setTimeout(function(){ sidebar(); }, 1000);
		}		
		portfolio();
		slider_height();
	});
	
	/* + Window On Load */
	$(window).on("load",function() {
		/* - Site Loader* */
		if ( !$("html").is(".ie6, .ie7, .ie8") ) {
			$("#site-loader").delay(1000).fadeOut("slow");
		}
		else {
			$("#site-loader").css("display","none");
		}
		
		if($(".sidebar-menu").length) {
			setTimeout(function(){ sidebar(); }, 1000);
		}
		slider_height();
		portfolio();
	});

})(jQuery);