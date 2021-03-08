<?php
/**
 * Plugin Name: WPC - Antispam Bot
 * Plugin URI: https://www.wpclinique.com/antispambot
 * Description: Create shortcodes to hide your email/others from spam bot
 * Version: 1.0
 * Author: WP Clinique
 * Author URI: https://www.wpclinique.com
 */

if (!function_exists('wpcab_email_encode_function')) {
  // EMAIL ENCODE SHORTCODE
  function wpcab_email_encode_function( $atts, $content ){
    return '<a href="'.antispambot("mailto:".$content).'" target="_blank">'.antispambot($content).'</a>';
  }
  add_shortcode( 'email', 'wpcab_email_encode_function' );
}


