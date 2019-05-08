/*-----------------------------------------------------------------------
	Theme Name: Royal Bakers
	Start Date : May 07 2016
	End Date : May 13 2016
	Last change: June 01 2016
	Version: 1.0
------------------------------------------------------------------------*/
	
	/* [Layout] */
	
/*----------------------------------------------------------------------
	- Google Map
	
	* Document Scroll		
		
	* Document Ready
		- Scrolling Navigation
		- Find all anchors
		- Add Easing Effect
		- Responsive Caret
		- Menu PopUp
		- Photo Slider
		- Client Carousel
		- Counter
		- Expanding Search
		- Contact Map
		- Quick Contact Form

	* Window Load
		- Site Loader
-------------------------------------------------------------------------*/

(function($) {

	"use strict"	
	
	/* - Google Map */
	function initialize(obj) {
		var lat = $("#"+obj).attr("data-lat");
        var lng = $("#"+obj).attr("data-lng");
		var contentString = $("#"+obj).attr("data-string");
		var myLatlng = new google.maps.LatLng(lat,lng);
		var map, marker, infowindow;
		var image = "images/marker.png";
		var zoomLevel = parseInt($("#"+obj).attr("data-zoom") ,10);		
		var styles = [{"featureType":"landscape","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","stylers":[{"saturation":-100},{"lightness":51},{"visibility":"simplified"}]},{"featureType":"road.highway","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"road.arterial","stylers":[{"saturation":-100},{"lightness":30},{"visibility":"on"}]},{"featureType":"road.local","stylers":[{"saturation":-100},{"lightness":40},{"visibility":"on"}]},{"featureType":"transit","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"administrative.province","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":-25},{"saturation":-100}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]}]
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
		
		infowindow = new google.maps.InfoWindow({
			content: contentString
		});      
	    
        marker = new google.maps.Marker({
			position: myLatlng,
			map: map,
			icon: image
		});

		google.maps.event.addListener(marker, "click", function() {
			infowindow.open(map,marker);
		});	
	}
	
	/* * Document Scroll - Window Scroll */
	$( document ).scroll(function()
	{
		var scroll	=	$(window).scrollTop();
		var height	=	$(window).height();

		/*** set sticky menu ***/
		if( scroll >= height )
		{
			$(".menu-block").addClass("navbar-fixed-top animated fadeInDown").delay( 2000 ).fadeIn();
		}
		else if ( scroll <= height )
		{
			$(".menu-block").removeClass("navbar-fixed-top animated fadeInDown");
		}
		else
		{
			$(".menu-block").removeClass("navbar-fixed-top animated fadeInDown");
		} /* set sticky menu - end */	

		if ($(this).scrollTop() >= 50)
		{
			/* If page is scrolled more than 50px */
			$("#back-to-top").fadeIn(200);    /* Fade in the arrow */
		}
		else
		{
			$("#back-to-top").fadeOut(200);   /* Else fade out the arrow */
		}
	});
		
	/* * Document Ready - Handler for .ready() called */
	$(document).ready(function($) {
	
		/* - Scrolling Navigation */
		var scroll	=	$(window).scrollTop();
		var width	=	$(window).width();
		var height	=	$(window).height();
		
		/*** set sticky menu ***/
		if( scroll >= height -500 )
		{
			$(".menu-block").addClass("navbar-fixed-top").delay( 2000 ).fadeIn();
		}
		else if ( scroll <= height )
		{
			$(".menu-block").removeClass("navbar-fixed-top");
		}
		else
		{
			$(".header-main").removeClass("navbar-fixed-top");
		} /* set sticky menu - end */
		
		$('.navbar-nav li a[href*="#"]:not([href="#"]), .site-logo a[href*="#"]:not([href="#"])').on('click', function(e) {

			var $anchor = $(this);
			
			$('html, body').stop().animate({ scrollTop: $($anchor.attr('href')).offset().top - 49 }, 1500, 'easeInOutExpo');
			
			e.preventDefault();
		});
		
		/* - Responsive Caret */
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
		
		/* - Menu PopUp */	
		$( "#menu-popup" ).on("click", function(event) {
			event.preventDefault();
			$(".ow-navigation .nav.menubar").toggle("slide");
		});
		
	
		/* - Photo Slider */

			/* Function to animate slider captions */ 
			function doAnimations( elems ) {
				/* Cache the animationend event in a variable */
				var animEndEv = 'webkitAnimationEnd animationend';
				
				elems.each(function () {
					var $this = $(this),
						$animationType = $this.data('animation');
					$this.addClass($animationType).one(animEndEv, function () {
						$this.removeClass($animationType);
					});
				});
			}

			/* Variables on page load */
			var $myCarousel = $('#main-carousel'),
				$firstAnimatingElems = $myCarousel.find('.item:first').find("[data-animation ^= 'animated']");
				
			/* Initialize carousel */ 
			$myCarousel.carousel();
			
			/* Animate captions in first slide on page load */
			doAnimations($firstAnimatingElems);
			
			/* Pause carousel */ 
			$myCarousel.carousel('pause');
			
			
			/* Other slides to be animated on carousel slide event */ 
			$myCarousel.on('slide.bs.carousel', function (e) {
				var $animatingElems = $(e.relatedTarget).find("[data-animation ^= 'animated']");
				doAnimations($animatingElems);
		});
		
		/* - Client Carousel */
		if( $(".clients-carousel").length ) {
			$(".clients-carousel").owlCarousel({
				loop: true,
				margin: 0,
				nav: false,
				dots: false,
				autoplay: false,
				responsive:{
					0:{
						items: 1
					},
					500:{
						items: 2
					},
					600:{
						items: 3
					},
					1000:{
						items: 5
					}
				}
			});
		}
		
		/* - Lightbox for Highlights Video */
		$('.video-section a').magnificPopup({
			disableOn: 700,
			type: 'iframe',
			mainClass: 'mfp-fade',
			removalDelay: 160,
			preloader: false,

			fixedContentPos: false
		});
		
		/* - Counter */
		if($(".counter-section").length) {
			$(".counter-section").each(function ()
			{
				var $this = $(this);
				var myVal = $(this).data("value");

				$this.appear(function()
				{		
					var statistics_item_count = 0;
					var statistics_count = 0;					
					statistics_item_count = $( "[id*='statistics_count-']" ).length;
					
					for(var i=1; i<=statistics_item_count; i++)
					{
						statistics_count = $( "[id*='statistics_count-"+i+"']" ).attr( "data-statistics_percent" );
						$("[id*='statistics_count-"+i+"']").animateNumber({ number: statistics_count }, 4000);
					}				
				});
			});
		}
		
		/* - Contact Map */
		if($("#map-canvas-contact").length==1){
			initialize("map-canvas-contact");
		}
		
		if($('#map-canvas-contact-1').length==1){
			initialize('map-canvas-contact-1');			
		}

		/* - Quick Contact Form */
		$( "#btn_submit" ).on( "click", function(event) {
		  event.preventDefault();
		  var mydata = $("form").serialize();
			$.ajax({
				type: "POST",
				dataType: "json",
				url: "contact.php",
				data: mydata,
				success: function(data) {
					if( data["type"] == "error" ){
						$("#alert-msg").html(data["msg"]);
						$("#alert-msg").removeClass("alert-msg-success");
						$("#alert-msg").addClass("alert-msg-failure");
						$("#alert-msg").show();
					} else {
						$("#alert-msg").html(data["msg"]);
						$("#alert-msg").addClass("alert-msg-success");
						$("#alert-msg").removeClass("alert-msg-failure");					
						$("#input_fname").val("");						
						$("#input_lname").val("");						
						$("#input_email").val("");						
						$("#input_phone").val("");						
						$("#input_subject").val("");						
						$("#textarea_message").val("");
						$("#alert-msg").show();				
					}			
				},
				error: function(xhr, textStatus, errorThrown) {
					alert(textStatus);
				}
			});
		});

		/* - Expanding Search */
		if( $(".sb-search").length ) {
			new UISearch( document.getElementById( "sb-search" ) );
		}
		
	});	/* - Document Ready /- */
	
	/* * Window Load - Handler for .load() called */
	$(window).load(function() {
		
		var $container = $('.portfolio-list');
		$container.isotope({
		  itemSelector: '.portfolio-list > li',
		  gutter: 0,
		  transitionDuration: "0.5s"
		});

		$('#filters a').on('click',function(){
			$('#filters a').removeClass('active');
			$(this).addClass('active');
			var selector = $(this).attr('data-filter');
			$container.isotope({ filter: selector });		
			return false;
		});
		
		/* - Site Loader */
		if ( !$("html").is(".ie6, .ie7, .ie8") ) {
			$("#site-loader").delay(1000).fadeOut("slow");
		}
		else {
			$("#site-loader").css("display","none");
		}
	});

})(jQuery);