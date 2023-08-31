jQuery(document).ready(function() {
    
    $(function() {
        $('.tabs .table .sidebar').overlayScrollbars({ });
    });

    $(function() {
        $('.tabs .table .content').overlayScrollbars({ });
    });

    $('.tabs .table .sidebar .links li').click(function() {
        if(!$(this).hasClass('active')) {
            var id = $(this).attr('id');
            $('.tabs .table .sidebar .links li').removeClass('active');
            $(this).addClass('active');
            $('.tabs .table .content .wrapper > div').hide();
            $('#content_' + id).fadeIn('fast');
        }
    });

    // Code terminal functions
    $('.code').each(function() {
        var $this = $(this);
        var clone = $(this).find('.copy');
        var content = $(this).find('.content').text();
        $(clone).click(function() {
            copyToClipboard(content);
            $this.find('.message').text('Coppied to clipboard.').fadeIn('fast').delay(1000).fadeOut('slow');
        });
    });

    // Copy the selected text to the clipboard
    function copyToClipboard(element) {
        var $temp = $('<input>');
        $('body').append($temp);
        $temp.val(element).select();
        document.execCommand('copy');
        $temp.remove();
    }
    
    // Toggle plugin
    $('.ar-toggle').each(function() {
        $(this).find('.tab').click(function(event) {
            if(event.target.classList.contains('ar-toggle-tab-title') && $(this).hasClass('active')) {
                $(this).removeClass('active');
            }
            else {
                $(this).addClass('active');
            }
        });
    });
    
    // Popup plugin
    var blind = '<div id="blind"></div>';

    $('.ar-popup-button').each(function() {
        $(this).click(function(event) {
            event.preventDefault();
            var id = $(this).attr('data-rel');
            var popup = $('#ar_popup_' + id);
            if(!$(popup).hasClass('active')) {
                if($('body').hasClass('blind')) {
                    $('#blind').fadeIn('fast');
                }
                else {
                    $('body').addClass('blind').append(blind);
                    $('#blind').fadeIn('fast');
                }
                $(popup).fadeIn('slow');
            }
        });
    });

    $('.ar-iframe-popup').each(function() {
        var popupID = $(this).attr('id');
        $(this).find('.close').on('click', function() {
            $('#blind').fadeOut('fast');
            $('#' + popupID).fadeOut('slow');
        });
    });
    
    // Simple HTML slider
    $('.ar-html-slider').each(function(){

        // Optional: You can add a data-height attribute to the .ar-html-slider div and set a minimum height for the whole slider. Please note that this will inject an inline CSS style to the slider.
        var customHeight = parseInt($(this).attr('data-height'));
        if(customHeight) {
            $(this).css('min-height', customHeight);
        }

		// Getting ID, Delay and Height of each Testimonial
		var currentTestimony = $(this).attr('id');
		var slideDelay = $(this).attr('data-delay');
		var effect = $(this).attr('data-effect');

		// Set the animation speed
		if($(this).attr('data-speed') > 0)
		{
			var slideSpeed = $(this).attr('data-speed');
		}
		else
		{
			// If speed is not selected, add 600ms as default
			var slideSpeed = 600;
		}

		// Set the delay if is not given via HTML
		if(!slideDelay)
		{
			// If delay is not selected, add 3000ms as default
			slideDelay = 3000;
		}

		var i = 0;
		function iteratetestimony() {
		    var list = $('#' + currentTestimony + ' > div');
            list.eq(i).fadeIn(slideSpeed).delay(slideDelay).fadeOut(slideSpeed, function() {
                i++;
                if(i % list.length === 0) {
                    i = 0;
                }
                iteratetestimony();
            });
		}
		iteratetestimony();
	});

	// Load iframe from class .load-iframe
	$('.load-iframe').each(function() {
    	$(this).click(function() {
        	var source = $(this).attr('data-rel');
        	var queryString = $(this).attr('data-query');
        	var iframe = '<iframe class="wide" src="' + source + '" frameborder="0">';
        	var link = '<a class="button iframe-button" href="' + queryString + '"><span class="fa fa-eye"></span> Go to Live Demo</a>';
        	$(this).html(iframe).addClass('loaded').append(link);
        	sizeiFrames();
        });
    });

	// Set the height of iframes according to their width
	$(window).resize(function() {
    	sizeiFrames();
    });
	sizeiFrames();
	function sizeiFrames() {
    	$('iframe.wide').each(function() {
        	var iWidth = $(this).width();
        	var iHeight = Math.floor(iWidth * 0.5625);
        	$(this).height(iHeight);
    	});
    }
});
