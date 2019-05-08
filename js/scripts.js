function getHeaderParams() {
	var headerSite = $(".header_site");
    if(bodyWidth <= 800) {
    	if( $(".promo_sect").length > 0 ) {
    		if( headerSite.offset().top > 1 ) {
    			headerSite.addClass("js");
    		} else {
    			headerSite.removeClass("js");
    		}
    	}else {
    		headerSite.addClass("js");
    	}
    }
}

function getAdaptivePositionElements() {
    $(".append-elem").each(function() {
        screenParam = parseInt( $(this).attr("data-min-screen") );
        indexElem = $(this).attr("data-append-desktop-elem");
        if( bodyWidth <= screenParam ) {
            $("[data-append-elem = '"+ indexElem +"']").append($(this).children());
        }
         if( bodyWidth > screenParam ) {
            $("[data-append-desktop-elem = '"+ indexElem +"']").append($("[data-append-elem = '"+ indexElem +"']").children());
        }
    });
}

var w = window,
d = document,
e = d.documentElement,
g = d.getElementsByTagName('body')[0],
bodyWidth = w.innerWidth || e.clientWidth || g.clientWidth;

var parentBlock;
var HEIGHTCONST;
var screenParam;
var indexElem;


$(window).resize(function() {

    bodyWidth = w.innerWidth || e.clientWidth || g.clientWidth;
    getAdaptivePositionElements();
    getHeaderParams();

});

$(document).scroll(function() {
    getHeaderParams();
});

$(document).ready(function() {
    getHeaderParams();
    getAdaptivePositionElements(); 

    $(".top_menu").each(function() {
        $(this).find(".main_nav > li ul").each(function() {
            $(this).addClass("sub-menu");
        });
        $(this).find(".main_nav > li").each(function() {
            if($(this).find(".sub-menu").length > 0) {
                $(this).append("<button type='button' class='menu_btn'></button>");
            }        
        });
    });

    $(".menu_btn").on("click", function(e) {
        e.preventDefault();
        var menuItem = $(this).closest("li").find(".sub-menu");
        if(menuItem.is(":hidden")) {
            menuItem.slideDown(300);
            $(this).addClass("active");
        } else {
            menuItem.slideUp(300);
            $(this).removeClass("active");
        }
    });

    $(".respmenubtn").click(function() {
        if( $("#resp_nav").is(":hidden") ) {
            $("#resp_nav").fadeIn(300);
            $(this).addClass("active");
        } else {
            $("#resp_nav").fadeOut(300);
            $(this).removeClass("active");
        }
    });

    $(this).keydown(function(eventObject){
        if (eventObject.which == 27 &&
            $("#resp_nav").is(":visible") ) {
                $("#resp_nav").fadeOut(300);
                $(".respmenubtn").removeClass("active");
        }
    });

	$(".search_open").on('click', function(e) {
		e.preventDefault();
		var searchPopup = $(".search_popup");
		searchPopup.toggleClass("active");
        if(!searchPopup.hasClass("active")) {
            $(".search_result").css({
                "display": "none"
            });
        }
	});

    $(".close_x").on('click', function(e) {
        e.preventDefault();
        var searchPopup = $(".search_popup");
        searchPopup.removeClass("active");
        $(".search_result").css({
            "display": "none"
        });
    });

	$(this).keydown(function(eventObject){
        if (eventObject.which == 27) {
			$(".search_popup").removeClass("active");
        }
    });

    $(document).mouseup(function (e){
        var hide_element = $(".search_popup")
        if (!hide_element.is(e.target)
            && hide_element.has(e.target).length === 0) {
        	$(".search_popup").removeClass("active");
        }
    });

	$(".dropdown_title").on('click', function(e) {		
		e.preventDefault();
		parentBlock = $(this).closest(".dropdowm_wrapp");
		var dropdownMenu = parentBlock.find(".dropdown_menu");
		if(dropdownMenu.is(":hidden")) {
			parentBlock.addClass("active");
			dropdownMenu.slideDown(300);
		} else {			
			dropdownMenu.slideUp(300);
			setTimeout(function() {
				parentBlock.removeClass("active");
			}, 400);
		}
	});

	$(".dropdowm_wrapp ul a").on('click', function(e) {
		e.preventDefault();
		var linkText = $(this).text();
		parentBlock = $(this).closest(".dropdowm_wrapp");
        parentBlock.find(".p_width").text(linkText);
		parentBlock.find(".dropdown_title input").val(linkText);
        parentBlock.find("ul a").removeClass("active");
        $(this).addClass("active");
	});

	$(this).keydown(function(eventObject){
        if (eventObject.which == 27) {
        	$(".dropdown_menu").slideUp(300);
        	setTimeout(function() {
				$(".dropdowm_wrapp").removeClass("active");
			}, 400);
        }
    });

    $(document).mouseup(function(e) {
        var hide_element = $(".dropdown_menu");
        if (!hide_element.is(e.target)
            && hide_element.has(e.target).length === 0) {
        	parentBlock = hide_element.closest(".dropdowm_wrapp");
            hide_element.slideUp(300);
            setTimeout(function() {
                $(".dropdowm_wrapp").each(function() {
                    if($(this).find(".dropdown_menu").is(":hidden")) {
                        $(this).removeClass("active");
                    }
                });
            }, 400);
        }
    });

    $(".text_box").each(function(e) {
        $(this).css({
            "height" : parseInt( $(this).attr("data-minheight") ) + "px"
        });
    });

	$("[data-slidebox-id]").on('click', function(e) {
		e.preventDefault();
		var slideTextName = $(this).attr('data-slidebox-id');
		var slideText = $("#" +slideTextName+"");
        HEIGHTCONST = parseInt(slideText.attr("data-minheight"));
		if(slideText.height() > HEIGHTCONST) {
			slideText.animate({
				"height" : HEIGHTCONST + "px"
			}, 500);
			$(this).removeClass("active");
		} else {
			slideText.animate({
				"height" : slideText.find(".inner_height").height() + "px"
			}, 500);
			setTimeout(function() {
				slideText.css({
					"height" : "auto"
				});
			}, 600);
			$(this).addClass("active");
		}
	});

	$("select").select2({
		"width" : "100%",
		minimumResultsForSearch: -1
	});

	$(".select_4_wrapp").each(function() {
		var selectTag = $(this).find("select");
		var placeholderText = selectTag.attr("data-placeholder");
		$(this).find("select").select2({
			"width": "100%",
			minimumResultsForSearch: 1,
			placeholder: placeholderText
		});
	});

    var countItem;

    $(".number_list").each(function() {
        countItem = 0;
        $(this).find("li").each(function() {
            countItem++;
            $(this).prepend("<span class='number'>"+countItem+". </span>");
        });
    });

	if( $(".slider_partners").length > 0 ) {
        $(".slider_partners").not(".slick-initialized").slick({
            dots: false,
            arrows: true,
            autoplay: true,
            autoplaySpeed: 4000,
            speed: 1200,
            slidesToShow: 6,
            slidesToScroll: 1,
            responsive: [
                {
                  breakpoint: 1220,
                  settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1
                  }
                },
                {
                  breakpoint: 1000,
                  settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1
                  }
                },
                {
                  breakpoint: 768,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                  }
                },
                {
                  breakpoint: 560,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                  }
                },
                {
                  breakpoint: 410,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                  }
                }
              ]
            });
    }

	if( $(".testimonial_slider").length > 0 ) {
        $(".testimonial_slider").not(".slick-initialized").slick({
            dots: false,
            autoplay: true,
            autoplaySpeed: 4000,
            speed: 1200,
            slidesToShow: 1,
            slidesToScroll: 1,
            fade: true,
            appendArrows: $(".testimonial_slider_contorls"),
            asNavFor: $(".slider_partners_2")
        });
    }

    if( $(".slider_partners_2").length > 0 ) {
        $(".slider_partners_2").not(".slick-initialized").slick({
            dots: false,
            arrows: false,
            slidesToShow: 6,
            slidesToScroll: 1,
            asNavFor: $(".testimonial_slider"),
            responsive: [
                {
                  breakpoint: 1140,
                  settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1
                  }
                },
                {
                  breakpoint: 960,
                  settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1
                  }
                },
                {
                  breakpoint: 768,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                  }
                },
                {
                  breakpoint: 510,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                  }
                },
                {
                  breakpoint: 400,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                  }
                }
              ]
            });

    }

    if( $(".slider_2").length > 0 ) {
        $(".slider_2").not(".slick-initialized").slick({
            dots: false,
            arrows: true,
            autoplay: true,
            autoplaySpeed: 4000,
            speed: 1200,
            slidesToShow: 3,
            slidesToScroll: 1,
            responsive: [
                {
                  breakpoint: 1100,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                  }
                },
                {
                  breakpoint: 900,
                  settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1
                  }
                },
                {
                  breakpoint: 768,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                  }
                },
                {
                  breakpoint: 510,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                  }
                },
                {
                  breakpoint: 400,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                  }
                }
              ]
        });
    }

    if( $(".slider_3").length > 0 ) {
        $(".slider_3").not(".slick-initialized").slick({
            dots: false,
            arrows: true,
            autoplay: true,
            autoplaySpeed: 4000,
            speed: 1200,
            slidesToShow: 3,
            slidesToScroll: 1,
            appendArrows: $(".slider_3_controls"),
            responsive: [
                {
                  breakpoint: 1130,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                  }
                },
                {
                  breakpoint: 640,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                  }
                }
            ]
        });
    }

    if( $(".slider_4").length > 0 ) {
        $(".slider_4").not(".slick-initialized").slick({
            dots: false,
            arrows: true,
            autoplay: true,
            autoplaySpeed: 4000,
            speed: 1200,
            slidesToShow: 3,
            slidesToScroll: 1,
            appendArrows: $(".slider_4_controls"),
            responsive: [
                {
                  breakpoint: 900,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                  }
                },
                {
                  breakpoint: 620,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                  }
                }
            ]
        });
    }

    $("[data-slidedown-btn]").on('click', function(e) {
    	e.preventDefault();
    	var slideBoxName = $(this).attr("data-slidedown-btn");
    	var slideBox = $("[data-slidedown = '"+ slideBoxName +"']");
    	HEIGHTCONST = parseInt( slideBox.attr("data-minheight") );
    	if( slideBox.height() <= HEIGHTCONST)  {
    		slideBox.animate({
    			"height" : slideBox.find(".tags_slidedown").height() + "px"
    		}, 300);
    		setTimeout(function() {
    			slideBox.css({
    				"height" : "auto"
    			});
    		}, 400);
    	}else {
    		slideBox.animate({
    			"height" : HEIGHTCONST + "px"
    		}, 300);
    	}

    });

    if( $(".charts_slider").length > 0 ) {
        $(".charts_slider").not(".slick-initialized").slick({
            dots: false,
            arrows: true,
            autoplay: true,
            autoplaySpeed: 4000,
            speed: 1200,
            slidesToShow: 1,
            slidesToScroll: 1,
            appendArrows: $(".charts_slider_controls")
        });
    }

    if($(".object_slider").length > 0) {
        $(".object_slider").not(".slick-initialized").slick({
            dots: false,
            arrows: true,
            autoplay: false,
            speed: 300,
            slidesToShow: 1,
            slidesToScroll: 1,
            fade: true,
            prevArrow: '<button class="slick-prev white_left_arrow" aria-label="Previous" type="button"></button>',
            nextArrow: '<button class="slick-next white_right_arrow" aria-label="Next" type="button"></button>'
        });

        $(".object_card *").on('click', function(e) {
            if($(this).hasClass("slick-prev") || $(this).hasClass("slick-next")) {
                e.preventDefault();
            }            
        });
    }

    var mapCheckbox;

    $(".map_checkbox").on('click', function() {
        var mapCheckbox = $(this).find("input");
        if(mapCheckbox.prop("checked")) {
            $(".map_object_templ").addClass("map_show");
        } else {
            $(".map_object_templ").removeClass("map_show");
        }
    });

    if( $(".table_slider").length > 0 ) {
        $(".table_slider").not(".slick-initialized").slick({
            dots: false,
            arrows: true,
            // autoplay: true,
            autoplaySpeed: 4000,
            speed: 1200,
            slidesToShow: 1,
            slidesToScroll: 1,
            fade: true,
            appendArrows: $(".table_slider_controls")
        });
    }

});