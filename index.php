<?php

/**
 * The main template file
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package _wp_theme_starter
 */

get_header();
?>


<main>
    <div class="container">
        <?php if (have_posts()) { ?>
            <div class="row">
                <?php while (have_posts()) { ?>
                    <?php the_post() ?>
                    <div class="col-sm-6 col-md-3">
                        <div class="card" style="width: 18rem;">
                            <div class="card-body">
                                <h2 class="card-title">
                                    <a href="<?php the_permalink() ?>" title="<?php the_title_attribute() ?>">
                                        <?php the_title() ?>
                                    </a>

                                    <?= _wp_theme_starter_the_post_meta() ?>
                                </h2>
                                <p class="card-text"><?php the_excerpt() ?></p>
                                <?= _wp_theme_starter_the_readmore_link() ?>
                            </div>
                        </div>
                    </div>
                <?php } ?>

                <?php the_posts_pagination() ?>
            </div>
        <?php } else { 

            get_template_part( 'template-parts/content', 'none' );

        } ?>
    </div>

</main>

<?php
get_sidebar();
get_footer();
