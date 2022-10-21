<?php



function _wp_theme_starter_enqueue_assets()
{
    // Enqueue Styles
    wp_enqueue_style('_wp_theme_starter-bundle-css', get_template_directory_uri() . '/dist/css/bundle.min.css', [], filemtime(get_template_directory() . '/dist/css/bundle.min.css'), 'all');
    wp_enqueue_style('_wp_theme_starter-bootstrap-css', get_template_directory_uri() . '/dist/css/lib/bootstrap/bootstrap.min.css', [], false, 'all');

    // enqueue scripts
    wp_enqueue_script('_wp_theme_starter-bundle-js', get_template_directory_uri() . '/dist/js/bundle.js', [], filemtime(get_template_directory() . '/dist/js/bundle.js'), true);
    wp_enqueue_script('_wp_theme_starter-bootstrap-js', get_template_directory_uri() . '/dist/js/lib/bootstrap/bootstrap.min.js', ['jquery'], false, true);
}

function _wp_theme_starter_admin_enqueue_assets()
{
    // Enqueue Styles
    wp_enqueue_style('_wp_theme_starter-admin-css', get_template_directory_uri() . '/dist/css/admin.min.css', [], filemtime(get_template_directory() . '/dist/css/bundle.min.css'), 'all');

    // Enqueue Scripts
    wp_enqueue_script('_wp_theme_starter-admin-js', get_template_directory_uri() . '/dist/js/admin.js', [], filemtime(get_template_directory() . '/dist/js/admin.js'), true);
}

add_action('wp_enqueue_scripts', '_wp_theme_starter_enqueue_assets');
add_action('admin_enqueue_scripts', '_wp_theme_starter_admin_enqueue_assets');
