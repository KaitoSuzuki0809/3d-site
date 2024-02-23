<?php
// jsとcssの読み込み
add_action( 'wp_enqueue_scripts', 'theme_enqueue_styles' );
function theme_enqueue_styles() {
    if (is_front_page()) {
        // TOPページのみ読み込み
        // wp_enqueue_script( 'animation', get_stylesheet_directory_uri() . '/_g3/assets/js/animation.js', '', '', true );
    }

    wp_enqueue_style( 'parent-style', get_template_directory_uri() . '/style.css' );
    wp_enqueue_style( 'child-style', get_stylesheet_directory_uri() . '/style.css', array('parent-style'));
}

if ( ! function_exists( 'my_shortcode' ) ) {
	function my_shortcode() {
		require 'top.php';
	}
	add_shortcode( 'load_top_page', 'my_shortcode' );
}
?>
