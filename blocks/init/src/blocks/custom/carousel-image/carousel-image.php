<?php
/**
 * Template for the Carousel Image Block.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$media = $attributes['media'] ?? [];

if ( ! $media ) {
  return;
}

$block_class = $attributes['blockClass'] ?? '';

$component_class = "
  {$block_class}
  swiper-slide
";

?>

<div class="<?php echo esc_attr( $component_class ); ?>">
  <?php echo wp_kses_post( Components::render( 'image', [
      'blockClass' => $attributes['blockClass'] ?? '',
      'media' => $media,
    ]
  ) );
  ?>
</div>
