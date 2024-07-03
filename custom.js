// Tab Code for Video's Page video switchout functionality

  // Makes sure the videos still show up if jquery does not work.
  jQuery('.secondary-videos .videos, .main-video').addClass('active-jq');

  jQuery('.secondary-videos .videos').click(function() {
    // Number of video selected to use to target main video with same number
    var number = jQuery(this).attr('class').split(" ")[1].split("-")[1];

    jQuery('.secondary-videos .videos').removeClass('selected-video');
    jQuery(this).addClass('selected-video');

    // This code makes sure that the previously selected video stops playing if the user played it and moved to a new video.
    jQuery('.main-video').each(function() {
      if (jQuery(this).hasClass('show-video')) {
        var video = jQuery(this).find('.video-wrapper iframe').attr("src");
        jQuery(this).find('.video-wrapper iframe').attr("src", "");
        jQuery(this).find('.video-wrapper iframe').attr("src", video);
      }
    });

    // Hides all videos and then displays only the one that was selected.
    jQuery('.main-video').removeClass('show-video');
    jQuery('.main-video-' + number).addClass('show-video');
  })

  // Make sure the main videos show up if its on a mobile device, instead of the video switchout function
  var isMobile = false;
  if (jQuery('.videos').css('float') == 'none') {
    isMobile = true;
    jQuery('.secondary-videos .videos, .main-video').removeClass('active-jq');
  }