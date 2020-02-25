<?php
/**
 * Logo component, should be usable without any attributes.
 *
 * @package Eightshift_Boilerplate\Components
 *
 * @since 1.0.0
 */

$block_class = $attributes['blockClass'] ?? 'logo';
$logo_url = $attributes['logoUrl'] ?? has_custom_logo() ? wp_get_attachment_image_src( get_theme_mod( 'custom_logo' ), 'full' )[0] : '';
$alt = $attributes['logoAlt'] ?? get_bloginfo( 'name' ) . ' logo';
$href = $attributes['href'] ?? get_bloginfo( 'url' );

?>
<a
  class="<?php echo esc_attr( $block_class ); ?>"
  href="<?php echo esc_url( $href ); ?>"
>
  <img
    src="<?php echo esc_url( $logo_url ); ?>"
    alt="<?php echo esc_attr( $alt ); ?>"
    class="<?php echo esc_attr( "{$block_class}__img" ); ?>"
  />
</a>
