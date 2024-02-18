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

// 生成されたscriptタグにtype=module属性をつける
// earth_spinning内で他のJSをimport可能にするため
// add_filter('script_loader_tag', 'add_type_attribute' , 10, 3);
// function add_type_attribute($tag, $handle, $src) {
//     // importを使用しないJSには適用しない
//     if ( 'animation' !== $handle ) {
//         return $tag;
//     }
//     // scriptタグにtype="module"を追加
//     $tag = '<script type="module" src="' . esc_url( $src ) . '"></script>';

//     return $tag;
// }

if ( ! function_exists( 'my_shortcode' ) ) {
	function my_shortcode() {
        $post_id = (string)get_post()->ID;
	    // $main_text = get_post_custom_values('main_text', $post_id)[0];

        echo '<link rel="stylesheet" href="' . get_stylesheet_directory_uri() . '/_g3/assets/css/3d-style.css">';
        echo '<script>';
        echo 'const imgPath = JSON.parse("' . addslashes(json_encode(get_stylesheet_directory_uri() . '/_g3/assets/images/')) . '");';
        echo '</script>';
		echo '<script src="' . get_stylesheet_directory_uri() . '/_g3/assets/js/jquery.js"></script>';
		echo '<script src="' . get_stylesheet_directory_uri() . '/_g3/assets/js/main.js"></script>';
		echo '<script type="module" src="' . get_stylesheet_directory_uri() . '/_g3/assets/js/fluid_animation.js"></script>';
		echo '<script type="module" src="' . get_stylesheet_directory_uri() . '/_g3/assets/js/animation.js"></script>';
	}
	add_shortcode( 'load_animation_js', 'my_shortcode' );
}

if ( ! function_exists( 'test_shortcode' ) ) {
	function test_shortcode() {
		echo '<script src="' . get_stylesheet_directory_uri() . '/_g3/assets/js/jquery.js"></script>';
		echo '<script type="module" src="' . get_stylesheet_directory_uri() . '/_g3/assets/js/test.js" defer></script>';
	}
	add_shortcode( 'load_test_js', 'test_shortcode' );
}
?>
