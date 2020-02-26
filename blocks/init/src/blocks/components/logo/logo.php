<?php
/**
 * Logo component, should be usable without any attributes.
 *
 * @package Eightshift_Boilerplate\Blocks
 *
 * @since 1.0.0
 */

namespace Eightshift_Boilerplate\Blocks;

use Eightshift_Boilerplate\Core\Config;
use Eightshift_Libs\Manifest\Manifest;

$block_class = $attributes['blockClass'] ?? 'logo';
$src         = $attributes['src'] ?? apply_filters( Config::get_config( Manifest::MANIFEST_ITEM_FILTER_NAME ), 'logo.svg' );
$alt         = $attributes['logoAlt'] ?? get_bloginfo( 'name' ) . ' logo';
$href        = $attributes['href'] ?? get_bloginfo( 'url' );

?>
<a
  class="<?php echo esc_attr( $block_class ); ?>"
  href="<?php echo esc_url( $href ); ?>"
>
  <img
    src="<?php echo esc_url( $src ); ?>"
    alt="<?php echo esc_attr( $alt ); ?>"
    class="<?php echo esc_attr( "{$block_class}__img" ); ?>"
  />
</a>