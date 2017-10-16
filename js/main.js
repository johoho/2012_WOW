$(document).ready(function() {
	var button = $('.callToAction nav,header nav,.socialMedia a');
var $tabs = $("header nav a"), $main = $(".content"), fadeSpeed = 1000, pageId = "#wowStory";
	var phin = $('#photo_inner')
	$(".draggable").draggable();
		
	$("header nav").hide();
	$("footer nav").hide();
	$(".content").hide();
	$.backstretch(["./img/backstretch/backstretch_01.jpg", "./img/backstretch/backstretch_02.jpg", "./img/backstretch/backstretch_03.jpg", "./img/backstretch/backstretch_04.jpg", "./img/backstretch/backstretch_05.jpg", "./img/backstretch/backstretch_06.jpg", "./img/backstretch/backstretch_07.jpg", "./img/backstretch/backstretch_08.jpg", "./img/backstretch/backstretch_09.jpg", "./img/backstretch/backstretch_10.jpg", "./img/backstretch/backstretch_11.jpg", "./img/backstretch/backstretch_12.jpg", "./img/backstretch/backstretch_13.jpg", "./img/backstretch/backstretch_14.jpg"], {
		fade : 750,
		duration : 50000
	});
	// ================BACKSTRETCH ENDS=====================

	$("header nav").animate({
		'height' : 'toggle'
	}, 3000, 'easeOutBounce', function() {
		$("footer nav").animate({
			'height' : 'toggle'
		}, 2000, 'easeOutBounce', function() {


			//=========================AJAX=================================
			//initialise
			loadContent(pageId);

			//tabs click handler
			$tabs.click(function(e) {

				e.preventDefault();

				//tabs selected states
				$tabs.filter(".selected").removeClass("selected");

				$(this).addClass("selected");

				//get pageId from href in the tab
				pageId = $(this).attr("href");

				//load content
				loadContent(pageId)

			});

			function loadContent(pageId) {

				$main.hide().empty().load("content.html " + pageId, function() {

					$(this).fadeIn(fadeSpeed);
					// animation

					//start of ACCORDION menu
					$('.content article > div').hide();
					$('.content article > div:last').show();
					$('.content h2').click(function() {
						$(this).next().animate({
							'height' : 'toggle'
						}, 'slow', 'easeOutBounce');

					});
					//end of ACCORDION menu

					$(".content h2").css('cursor', 'pointer');
					//chaning cursor to hand/pointing finger

					$('a.lightbox').click(function(e) {//start of LIGHTBOX
						$('body').css('overflow-y', 'hidden');
						// hide scrollbars!

						$('<div id="overlay"></div>').css('top', $(document).scrollTop()).css('opacity', '0').animate({
							'opacity' : '0.5'
						}, 'slow').appendTo('body');

						$('<div id="lightbox"></div>').hide().appendTo('body');

						$('<img>').attr('src', $(this).attr('href')).load(function() {
							positionLightboxImage();
						}).click(function() {
							removeLightbox();
						}).appendTo('#lightbox');

						return false;
					});
					//LIGHTBOX ends
					
					$("#startStory").click(function(e){
						$("#story p").stop(true, true).animate({"right":"20000"}, 2000000)
					});
					
						$(".enterComp").click(function(e){
		window.location.assign("http://www.worldofwearableart.com/designers/welcome")
	});	
	
						$("#buyTix").click(function(e){
							window.location.assign("http://www.worldofwearableart.com/tickets/show-dates-prices")
						});

					/*========================== Dissolve Image Gallery  ============================*/

					/*------------------Declare variables--------------------*/

					var thumbOpacity = .40, thumbSpeed = 5000, currentIndex = 0, dissolveSpeed = 200, $thumbs = $(".thumbs iframe"), $images = $(".vid iframe"), $nextBtn = $(".next-btn"), $prevBtn = $(".prev-btn"), $imageWrapper = $(".vid"), numImages = $images.length, interval, delay = 5000;

					/*------------------ Initialisation -------------------*/

					//initialise thumbs
					$thumbs.css({
						"opacity" : thumbOpacity
					}).eq(currentIndex).addClass("selected").css({
						"opacity" : 1
					});

					//initialise images
					$images.parent().css("position", "relative");
					$images.css("position", "absolute").hide().eq(currentIndex).fadeIn(dissolveSpeed);

					/*------------------ Timer Functionality --------------------*/
					startSlideshow();

					function startSlideshow() {

						interval = setInterval(function() {

							var newIndex;
							newIndex = currentIndex + 1;
							changeImage(newIndex % numImages);

						}, delay);

					}

					function stopSlideshow() {

						clearInterval(interval);

					}

					/*------------------ Slideshow Pause on hover and restart on hover off --------------------*/

					$imageWrapper.hover(function() {

						stopSlideshow();

					}, function() {

						var newIndex;
						newIndex = currentIndex + 1;
						changeImage(newIndex % numImages);
						startSlideshow();

					});

					/*------------------ Thumbs Hover Handler --------------------*/

					//add hover event handler to the set of thumbs
					$thumbs.hover(function() {

						//on mouse enter fade the thumb in to full thumbOpacity
						$(this).stop(true, true).fadeTo(thumbSpeed, 1);

					}, function() {

						//on mouse leave fade the thumb out to thumbOpacity
						if ($thumbs.index(this) !== currentIndex) {
							$(this).stop(true, true).fadeTo(thumbSpeed, thumbOpacity);
						}

					});

					function changeImage(newIndex) {

						//fade out current image and remove selected class form thumb
						$images.eq(currentIndex).fadeOut(dissolveSpeed);
						$thumbs.eq(currentIndex).removeClass("selected").stop(true, true).fadeTo(thumbSpeed, thumbOpacity);

						//update the current index
						currentIndex = newIndex;

						//fade in the selected image and add selected class to thumb
						$images.eq(currentIndex).stop(true, true).fadeIn(dissolveSpeed);
						$thumbs.eq(currentIndex).addClass("selected").fadeTo(thumbSpeed, 1);

					};

					/*------------------ Thumbs Click Handler --------------------*/

					$thumbs.click(function() {

						stopSlideshow();

						var selectedIndex = $thumbs.index(this);

						//only change image if not the selected image
						if (currentIndex != selectedIndex) {

							changeImage(selectedIndex);

						}

					});

					/*---------------------- Next and Previous Btns -----------------------*/

					$nextBtn.click(function() {

						stopSlideshow();

						if (currentIndex < numImages - 1) {

							changeImage(currentIndex + 1);

						} else {

							changeImage(0);

						}

					});

					$prevBtn.click(function() {

						stopSlideshow();

						//update the current index
						if (currentIndex > 0) {

							changeImage(currentIndex - 1);

						} else {

							changeImage(numImages - 1);

						}

					});

					//================= VIDEO NEXT BUTTON ==================

					var phin = $('.photos_inner');

					$("button.left").click(function() {
						var scrollAmount = phin.width() - phin.parent().width();
						var currentPos = Math.abs(parseInt(phin.css('left')));
						var remainingScroll = scrollAmount - currentPos;

						// Scroll half-a-screen by default
						var nextScroll = Math.floor(phin.parent().width() / 2);

						// But if there isn’t a FULL scroll left, do only the remaining amount.
						if (remainingScroll < nextScroll) {
							nextScroll = remainingScroll;
						}

						if (currentPos < scrollAmount) {
							// Scroll left
							phin.animate({
								'left' : '-=' + nextScroll
							}, 'slow');
						} else {
							// Scroll right
							phin.animate({
								'left' : '0'
							}, 'fast');
						}
					});

				});
			}//===============AJAX ENDS=============================

		}) // End of Callback for 2nd animation
	});
	//End of Callback for 1st animation

});
/*End of document ready*/

function positionLightboxImage() {
	var top = ($(window).height() - $('#lightbox').height()) / 2;
	var left = ($(window).width() - $('#lightbox').width()) / 2;
	$('#lightbox').css({
		'top' : top + $(document).scrollTop(),
		'left' : left
	}).fadeIn();
}

function removeLightbox() {
	$('#overlay, #lightbox').fadeOut('slow', function() {
		$(this).remove();
		$('body').css('overflow-y', 'auto');
		// show scrollbars!
	});
}
