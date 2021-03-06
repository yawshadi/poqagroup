/*
* Video Links for sharing
* keywords: hashmark hashtag anchor links
* */
if (typeof (flowplayer) !== "undefined" && typeof(fv_flowplayer_conf) != "undefined"  && fv_flowplayer_conf.video_hash_links ) {
  flowplayer(function (api, root) {
    if( jQuery(root).find('.sharing-link').length > 0 ) {
      var abEnd, abStart, hash, sTime;

      function update_link( abStartNew, abEndNew ) {
        hash = fv_player_get_video_link_hash(api);
        sTime = ',' + fv_player_time_hms(api.video.time);
        
        if( abStartNew && abEndNew ) {
          abStart = ',' + fv_player_time_hms(abStartNew + api.get_custom_start());
          abEnd = ',' + fv_player_time_hms(abEndNew + api.get_custom_start());
        } else {
          var abEnabled = jQuery(root).find('.fv-player-ab.is-active').length;
          abEnd = abEnabled && typeof api.get_ab_end() != 'undefined' && api.get_ab_end() ? ',' + fv_player_time_hms(api.get_ab_end()) : '';
          abStart = abEnabled && typeof api.get_ab_start() != 'undefined' && api.get_ab_start() ? ',' + fv_player_time_hms(api.get_ab_start()) : '';
        }

        jQuery('.sharing-link',root).attr('href',jQuery('.sharing-link',root).attr('href').replace(/#.*/,'') + '#' + hash + sTime + abStart + abEnd);
      }

      api.on("ready", function (e,api,video) {
        if(!api.fv_noUiSlider) return;

        // update link when slider is set
        api.fv_noUiSlider.on('set', function(values) {
          update_link(values[0], values[1]);
        });
      });

      // update link on progress
      api.on('progress',function(e,api) {
        if( !api.video.sources || !api.video.sources[0] ) {
          return;
        }
        update_link();
      });
      
      jQuery('.sharing-link',root).click( function(e) {

        fv_player_clipboard( jQuery(this).attr('href'), function() {
          e.preventDefault();
          fv_player_notice(root,fv_flowplayer_translations.link_copied,2000);
        });
      })
    }
  })

  jQuery(document).on('click','a[href*="fvp_"]', function() {
    var link = jQuery(this)
    setTimeout( function() {
      if( link.parents('.fvp-share-bar').length == 0 ) fv_autoplay_exec();
    } );
  });

}
