<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content" class="site-content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package _wp_theme_starter
 */

?><!DOCTYPE html>
<html lang="<?php language_attributes() ?>">

<head>
    <meta charset="<?php bloginfo('charset') ?>">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Handed Theme</title>

    <?php wp_head() ?>
</head>

<body <?php body_class() ?>>

    <?php

    if (function_exists('wp_body_open')) {
        wp_body_open();
    }

    ?>
    <div id="content" class="site-content">