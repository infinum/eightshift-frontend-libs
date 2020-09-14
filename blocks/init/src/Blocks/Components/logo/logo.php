<?php
/**
 * Logo component, should be usable without any attributes.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplate\Manifest\Manifest;

$blockClass = $attributes['blockClass'] ?? 'logo';
$src         = $attributes['src'] ?? apply_filters( Manifest::MANIFEST_ITEM, 'logo.svg' );
$alt         = $attributes['logoAlt'] ?? get_bloginfo( 'name' ) . ' logo';
$href        = $attributes['href'] ?? get_bloginfo( 'url' );

?>
<a
  class="<?php echo esc_attr( $blockClass ); ?>"
  href="<?php echo esc_url( $href ); ?>"
>
  <img
    src="<?php echo esc_url( $src ); ?>"
    alt="<?php echo esc_attr( $alt ); ?>"
    class="<?php echo esc_attr( "{$blockClass}__img" ); ?>"
  />
</a>
