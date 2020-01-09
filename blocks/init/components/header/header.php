<?php
/**
 * Main header bar
 *
 * @package Eightshift_Boilerplate\Blocks
 *
 * @since 1.0.0
 */

use Eightshift_Boilerplate\Menu\Menu;
use Eightshift_Boilerplate\Core\Config;
use Eightshift_Libs\Manifest\Manifest;

$blog_name        = get_bloginfo( 'name' );
$blog_description = get_bloginfo( 'description' );
$header_logo_info = $blog_name . ' - ' . $blog_description;
$logo_img         = apply_filters( Config::get_config( Manifest::MANIFEST_ITEM_FILTER_NAME ), 'logo.svg' );

?>
<div class="header">
  <a class="header__logo-link" href="<?php echo esc_url( home_url() ); ?>" title="<?php echo esc_attr( $blog_name ); ?>">
    <img class="header__logo-img" src="<?php echo esc_url( $logo_img ); ?>" title="<?php echo esc_attr( $header_logo_info ); ?>" alt="<?php echo esc_attr( $header_logo_info ); ?>" />
  </a>
  <?php
    echo esc_html( Menu::bem_menu( 'header_main_nav', 'main-navigation' ) );

    get_template_part( 'src/blocks/components/header/components/search/search' );
  ?>
</div>
