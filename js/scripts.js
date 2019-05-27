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
        // setTimeout(function() {
        //     getBarsChart();
        //     console.log("chart");
        // }, 3000);        
    });
}

function getBarsChart() {
    if($(".bars").length > 0) {
        $(".bars").each(function() {
            if( $(this).is(":visible") ) {
                var heightArr = [];
                bar = $(this).find(".bar");
                barsLength = bar.length;
                bar.each(function() {
                    heightVal = parseInt($(this).attr("data-count-val"));
                    heightArr.push(heightVal);
                });
                maxHeight = Math.max.apply(null, heightArr);
                chartHeight = $(this).height();
                chartWidth = $(this).width();
                heightModul = chartHeight/maxHeight;      
                bar.each(function() {
                    heightVal = parseInt($(this).attr("data-count-val"));
                    $(this).css({
                        "height" : ( heightVal * heightModul ) + "px",
                        "width" : chartWidth / barsLength + "px"
                    });
                });
                barsCharts = $(this).closest(".bars_range_wrapp");
                handleLower = barsCharts.find(".noUi-handle-lower");
                handleUpperr = barsCharts.find(".noUi-handle-upper");
                leftCoord = handleLower.offset().left;
                rightCoord = handleUpperr.offset().left;        
                $(this).find(".bar").each(function() {
                    if( $(this).offset().left > leftCoord && $(this).offset().left < rightCoord ) {
                        $(this).removeClass("disable");
                    } else {
                        $(this).addClass("disable");
                    }
                });
            }
        });
    }
}

function getMapParams() {
    if( $(".object_map").length > 0) {
        filtersCoord = $(".filter_nav").offset().top + $(".filter_nav").height();
        mapCoord = $(".object_map").offset().top;        
        if(filtersCoord >= mapCoord) {            
            $(".map_scroll").addClass("fixed");
            $(".map_scroll").css({
                "top" : $(".filter_nav").height() + "px"
            });
            mapScrollBootmCoord = filtersCoord + $(".map_scroll").height();
            bottomCoord = $(".bottom_coord").offset().top;
            if( mapScrollBootmCoord >= bottomCoord ) {
                $(".map_scroll").addClass("bottom_position");
            } else {
                $(".map_scroll").removeClass("bottom_position");
            }
        } else {
            $(".map_scroll").removeClass("fixed");
            $(".map_scroll").css({
                "top" : 0
            });
        }
        $(".map_scroll").css({
            "height" : $(window).height() - $(".filter_nav").height() + "px"
        });
    }
}

function getfilterNavParams() {
    if($("#filters").length > 0) {
        $(".filter_resp").css({"height" : "auto"});
        if($(window).scrollTop() > $("#filters").offset().top ) {
            $(".filter_nav").addClass("fixed");
            $("#filters").outerHeight($(".filter_nav").outerHeight());
            $(".filter_resp").css({
                "height" : $(window).height() - $("#filters").height() + "px"
            });
        } else {
            $(".filter_nav").removeClass("fixed");
            $("#filters").height(false);            
            $(".filter_resp").css({
                "height" : $(window).height() - $("#filters").height() - $(".header_site_inner").height() + "px"
            });
        }
    }
}

// function getRespFilterParams() {
//     var topCoord = $(".filter_resp").offset().top;
//     $(".filter_resp").css({
//         "height" : $(window).height() + $(".items_sect").height() - topCoord
//     });
//     console.log($(".filter_resp").offset().top);
// }

// function getRespFilterParams() {
//     if($(".filters").length > 0) {
//         var rightFlagCoord = $(".resp_coord").offset().left;
//         $(".filters").find(".item_wrapp").each(function() {
//             var rightCoordFilter = $(this).offset().left + $(this).width();            
//             if(rightCoordFilter >= rightFlagCoord - 100) {
//                 $(this).appendTo(".fiter_resp");
//             }
//         });
//     }
// }

var w = window,
d = document,
e = d.documentElement,
g = d.getElementsByTagName('body')[0],
bodyWidth = w.innerWidth || e.clientWidth || g.clientWidth;

var parentBlock;
var HEIGHTCONST;
var screenParam;
var indexElem;

var bar,
    heightVal,
    chartHeight,
    chartWidth,
    heightModul,
    maxHeight,
    barsLength;

var minVal,
    maxVal,
    leftRange,
    rightRange,
    leftCoord,
    rightCoord,
    values,
    handleLower,
    handleUpperr;

var filtersCoord,
    mapCoord,
    mapScrollBootmCoord,
    bottomCoord;


$(window).resize(function() {

    bodyWidth = w.innerWidth || e.clientWidth || g.clientWidth;
    getAdaptivePositionElements();
    getHeaderParams();
    getMapParams();
    getBarsChart();
    getfilterNavParams();
    // getRespFilterParams();
    // getRespFilterParams();

});

$(document).scroll(function() {
    getHeaderParams();
    getMapParams();
    getfilterNavParams();
});

$(document).ready(function() {
    getHeaderParams();
    getAdaptivePositionElements();
    getMapParams();
    getBarsChart();
    getfilterNavParams();
    // getRespFilterParams();

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
        var slideImgBox;
        var imagePath;
        var objectSlider;

        objectSlider = $(".object_slider").not(".slick-initialized").slick({
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

        $(".object_slider").each(function() {
            slideImgBox = $(this).find(".slick-current .img_box");
            imagePath = $(this).find(".slick-current .img_box").attr("data-imageurl");
            slideImgBox.find("img").attr("src", imagePath);
        });

        objectSlider.on('beforeChange', function(event, slick, currentSlide, nextSlide){
            slideImgBox = $(this).find("[data-slick-index ="+nextSlide+"] .img_box");
            imagePath = slideImgBox.attr("data-imageurl");
            slideImgBox.find("img").attr("src", imagePath);
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

    var dropdowmMenu;

    $(".dropdown_item_title").on('click', function(e) {
        e.preventDefault();
        parentBlock = $(this).closest(".dropdow_item_wrapp");
        dropdowmMenu = parentBlock.find(".dropdown_item_menu");
        if(dropdowmMenu.is(":hidden")) {
            $(".item_wrapp").removeClass("z_top");
            dropdowmMenu.slideDown(300);
            parentBlock.addClass("active");
            parentBlock.closest(".item_wrapp").addClass("z_top");
            $("#map_box .mask").addClass("visible");
            getBarsChart();
            if(parentBlock.closest(".items_sect").length > 0 &&
                $(".filter_resp").is(":visible") ) {
                $(".filter_resp").fadeOut(300);
                $(".more_filter").removeClass("active");
                $(".mask_2").fadeOut(300);
            }
        } else {
            dropdowmMenu.slideUp(300);
            parentBlock.removeClass("active");
            $("#map_box .mask").removeClass("visible");
        }
    });

    $(this).keydown(function(eventObject){
        if (eventObject.which == 27) {
            $(".dropdown_item_menu").slideUp(300);
            setTimeout(function() {
                $(".dropdow_item_wrapp").removeClass("active");
                $("#map_box .mask").removeClass("visible");
            }, 400);
        }
    });

    $("#map_box .mask").on("click", function(e) {
        e.preventDefault();
        $(".dropdown_item_menu").slideUp(300);
        setTimeout(function() {
            $(".dropdow_item_wrapp").removeClass("active");
            $(this).removeClass("visible");
        }, 400);
    });

    $(document).mouseup(function(e) {
        var hide_element = $(".dropdown_item_menu");
        if (!hide_element.is(e.target)
            && hide_element.has(e.target).length === 0) {
            hide_element.slideUp(300);
            setTimeout(function() {
                $(".dropdow_item_wrapp").each(function() {
                    if($(this).find(".dropdown_item_menu").is(":hidden")) {
                        $(this).removeClass("active");
                    }
                });
            }, 400);
            $("#map_box .mask").removeClass("visible");
        }
    });

    $(".custom_select .select_input").on("click", function(e) {
        e.preventDefault();
        parentBlock = $(this).closest(".custom_select");
        dropdowmMenu = parentBlock.find(".dropdown_select");
        if(dropdowmMenu.is(":hidden")) {
            dropdowmMenu.slideDown(200);
            parentBlock.addClass("active");
        } else {
            dropdowmMenu.slideUp(200);
            parentBlock.removeClass("active");
        }
    });

    $(this).keydown(function(eventObject){
        if (eventObject.which == 27) {
            $(".dropdown_select").slideUp(300);
            setTimeout(function() {
                $(".custom_select").removeClass("active");
            }, 400);
        }
    });

    $(document).mouseup(function(e) {
        var hide_element = $(".dropdown_select");
        if (!hide_element.is(e.target)
            && hide_element.has(e.target).length === 0) {
            hide_element.slideUp(300);
            setTimeout(function() {
                $(".dropdown_select").each(function() {
                    if($(this).is(":hidden")) {
                        $(this).closest(".custom_select").removeClass("active");
                    }
                });
            }, 400);
        }
    });

    $(".select_item p").on("click", function(e) {
        e.preventDefault();
        var itemText = $(this).text();
        parentBlock = $(this).closest(".custom_select");
        var inputVal = parentBlock.find(".select_input .sel_val");
        parentBlock.find(".select_res").val(itemText);
        inputVal.html(itemText);
    });

    $(".more_filter").on('click', function(e) {
        e.preventDefault();
        if( $("#filters_menu").is(":hidden") ) {
            $("#filters_menu").fadeIn(300);
            $(this).addClass("active");
            // $(".mask_2").fadeIn(300);
            getBarsChart();
        } else {
            $("#filters_menu").fadeOut(300);
            $(this).removeClass("active");
            // $(".mask_2").fadeOut(300);
        }
    });

    $(".mask_2").on("click", function() {
        $("#filters_menu").fadeOut(300);
        $(".more_filter").removeClass("active");
    });

    $(this).keydown(function(eventObject){
        if (eventObject.which == 27) {
            $("#filters_menu").fadeOut(300);
            $(".more_filter").removeClass("active");
        }
    });

    // Range Slider

    if( document.getElementById("range_slider_2") ) {
        priceSlider2 = document.getElementById("range_slider_2");
        noUiSlider.create(priceSlider2, {
          start: [ 1000, 50000 ],
          range: {
              'min': [ 0 ],
              'max': [ 100000 ]
          },
          connect: true,
            format: wNumb({
                decimals: 0
            })
        });
        priceSlider2.noUiSlider.on('update', function( values, handle ) {
            minVal = parseInt( values[0] );
            maxVal = parseInt( values[1] );
            $("#input-number_1").val(minVal);
            $("#input-number_2").val(maxVal);
            leftRange = minVal;
            rightRange = maxVal;
            handleLower = $("#range_slider_2").find(".noUi-handle-lower");
            handleUpperr = $("#range_slider_2").find(".noUi-handle-upper");
            leftCoord = handleLower.offset().left;
            rightCoord = handleUpperr.offset().left;
            barsCharts = handleLower.closest(".bars_range_wrapp");
            barsCharts.find(".bars .bar").each(function() {
                if( $(this).offset().left > leftCoord && $(this).offset().left < rightCoord ) {
                    $(this).removeClass("disable");
                } else {
                    $(this).addClass("disable");
                }
            });
        });
        priceSlider2.noUiSlider.on('set', function( values, handle ) {
            setTimeout(function() {           
                handleLower = $("#range_slider_2").find(".noUi-handle-lower");
                handleUpperr = $("#range_slider_2").find(".noUi-handle-upper");
                leftCoord = handleLower.offset().left;
                rightCoord = handleUpperr.offset().left;
                barsCharts = handleLower.closest(".bars_range_wrapp");
                barsCharts.find(".bars .bar").each(function() {
                    if( $(this).offset().left > leftCoord && $(this).offset().left < rightCoord ) {
                        $(this).removeClass("disable");
                    } else {
                        $(this).addClass("disable");
                    }
                });
            }, 500);
        });
        $("#input-number_1").keyup(function() {
            activeInputVal = parseInt( $(this).val() );
            if( activeInputVal < parseInt( $("#input-number_2").val() ) ) {
                leftRange = parseInt( $(this).val() );
                priceSlider2.noUiSlider.set([leftRange, null]);
            }
        });
        $("#input-number_2").keyup(function() {
          activeInputVal = parseInt( $(this).val() );
          if( activeInputVal > parseInt( $("#input-number_1").val() ) ) {
              rightRange = parseInt( $(this).val() );
              priceSlider2.noUiSlider.set([null, rightRange]);
          }
        });
    }

    if( document.getElementById("range_slider_3") ) {
        priceSlider3 = document.getElementById("range_slider_3");
        noUiSlider.create(priceSlider3, {
          start: [ 1000 ],
          range: {
              'min': [ 0 ],
              'max': [ 100000 ]
          },
          connect: [true, false],
          tooltips: true,
            format: wNumb({
                decimals: 0
            }),
        });
    }

    if( document.getElementById("range_slider_4") ) {
        priceSlider4 = document.getElementById("range_slider_4");
        noUiSlider.create(priceSlider4, {
          start: [ 1000, 3500 ],
          range: {
              'min': [  0 ],
              'max': [ 8906 ]
          },
          connect: true,
            format: wNumb({
                decimals: 0
            })
        });
        inputNumberMin = document.getElementById("input-number_5");
        inputNumberMax = document.getElementById("input-number_6");

        priceSlider4.noUiSlider.on('update', function( values, handle ) {
            minVal = parseInt( values[0] );
            maxVal = parseInt( values[1] );
            leftRange = maxVal;
            rightRange = maxVal;
            $("#input-number_5").val(minVal);
            $("#input-number_6").val(maxVal);
            handleLower = $("#range_slider_4").find(".noUi-handle-lower");
            handleUpperr = $("#range_slider_4").find(".noUi-handle-upper");
            leftCoord = handleLower.offset().left;
            rightCoord = handleUpperr.offset().left;
            barsCharts = handleLower.closest(".bars_range_wrapp");
            barsCharts.find(".bars .bar").each(function() {
                if( $(this).offset().left > leftCoord && $(this).offset().left < rightCoord ) {
                    $(this).removeClass("disable");
                } else {
                    $(this).addClass("disable");
                }
            });
        });

        priceSlider4.noUiSlider.on('set', function( values, handle ) {
            setTimeout(function() { 
                handleLower = $("#range_slider_4").find(".noUi-handle-lower");
                handleUpperr = $("#range_slider_4").find(".noUi-handle-upper");
                leftCoord = handleLower.offset().left;
                rightCoord = handleUpperr.offset().left;
                barsCharts = handleLower.closest(".bars_range_wrapp");
                barsCharts.find(".bars .bar").each(function() {
                    if( $(this).offset().left > leftCoord && $(this).offset().left < rightCoord ) {
                        $(this).removeClass("disable");
                    } else {
                        $(this).addClass("disable");
                    }
                });
            }, 500);
        });

        $("#input-number_5").keyup(function() {
            activeInputVal = parseInt( $(this).val() );
            if( activeInputVal < parseInt( $("#input-number_6").val() ) ) {
                leftRange = parseInt( $(this).val() );
                priceSlider4.noUiSlider.set([leftRange, null]);
            }
        });
        $("#input-number_6").keyup(function() {
          activeInputVal = parseInt( $(this).val() );
          if( activeInputVal > parseInt( $("#input-number_5").val() ) ) {
              rightRange = parseInt( $(this).val() );
              priceSlider4.noUiSlider.set([null, rightRange]);
          }
        });
    }

    var imagesArrayPaths = [];
    var index,
        imagesPathParent,
        pathVal,
        galleryimagesLinks;

    $("[data-photogallerylink]").on("click", function(e) {
        e.preventDefault();
        $(".photo_gallery").html("");
        imagesArrayPaths = [];
        index = $(this).attr("data-photogallerylink");
        imagesPathParent = $("[data-photogalleryindex ='"+ index +"' ]");
        imagesPathParent.find("[data-imagepath]").each(function() {
            pathVal = $(this).attr("data-imagepath");
            imagesArrayPaths.push(pathVal);
        });
        galleryimagesLinks = "";
        jQuery.each( imagesArrayPaths, function( i, val ) {
            galleryimagesLinks += '<a href="'+val+'" data-fancybox="1"><img src="'+val+'" alt="#" /></a>';
        });
        $(".photo_gallery").html(galleryimagesLinks);
        $(".photo_gallery [data-fancybox]:eq(0)").trigger("click");
    });

    var selectVal,
        selectList;

    // $(".custom_select_title").on("click", function(e) {
    //     e.preventDefault();
    //     parentBlock = $(this).closest(".custom_select_2");
    //     parentBlock.toggleClass("active");
    // });

    $(".custom_select_item").on("click", function(e) {
        e.preventDefault();
        selectVal = $(this).html();
        parentBlock = $(this).closest(".custom_select_2");
        parentBlock.find(".custom_select_title").html(selectVal);
        parentBlock.find(".custom_select_item").removeClass("selected");
        $(this).addClass("selected");
    });

    // $(this).keydown(function(eventObject){
    //     if (eventObject.which == 27) {
    //         $(".custom_select_2").removeClass("active");
    //     }
    // });

    // $(document).mouseup(function(e) {
    //     // var hide_element = $(".custom_select_list");
    //     $(".custom_select_2").each(function() {
    //         hide_element = $(this).find(".custom_select_list");
    //         if (!hide_element.is(e.target)
    //             && hide_element.has(e.target).length === 0) {
    //             hide_element.closest(".custom_select_2").removeClass("active");
    //         }
    //     });
    // });

    $(".custom_select_title").on("click", function(e) {
        e.preventDefault();
        parentBlock = $(this).closest(".custom_select_2");
        dropdowmMenu = parentBlock.find(".custom_select_list");
        if(dropdowmMenu.is(":hidden")) {
            dropdowmMenu.slideDown(200);
            parentBlock.addClass("active");
        } else {
            dropdowmMenu.slideUp(200);
            parentBlock.removeClass("active");
        }
    });

    $(this).keydown(function(eventObject){
        if (eventObject.which == 27) {
            $(".custom_select_list").slideUp(300);
            setTimeout(function() {
                $(".custom_select_2").removeClass("active");
            }, 400);
        }
    });

    $(document).mouseup(function(e) {
        var hide_element = $(".custom_select_list");
        if (!hide_element.is(e.target)
            && hide_element.has(e.target).length === 0) {
            hide_element.slideUp(300);
            setTimeout(function() {
                $(".custom_select_list").each(function() {
                    if($(this).is(":hidden")) {
                        $(this).closest(".custom_select_2").removeClass("active");
                    }
                });
            }, 400);
        }
    });

});