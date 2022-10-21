<?php

function _wp_theme_starter_the_post_meta()
{
    return '
    <small>
        Post On:
        <a href="' . get_permalink() . '" title="' . the_title_attribute(['echo' => false]) . '">
            <time datetime="' . get_the_date('c') . '">' . get_the_date() . '</time>
        </a>,
        By: <a href="' . get_author_posts_url(get_the_author_meta('ID')) . '">' . get_the_author() . '</a>
    </small>';
}


function _wp_theme_starter_the_readmore_link() {
    return '
        <a href="' . get_permalink() . '" title="' . the_title_attribute(['echo' => false]) . '" class="btn btn-primary">Read More <span class="u-screen-reader-text">About ' . get_the_title() . '</span></a>
    ';
}