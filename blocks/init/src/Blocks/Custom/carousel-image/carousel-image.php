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

$blockClass = $attributes['blockClass'] ?? '';

$componentClass = "
  {$blockClass}
  swiper-slide
";

?>

<div class="<?php echo esc_attr( $componentClass ); ?>">
  <?php echo wp_kses_post( Components::render( 'image', [
      'blockClass' => $attributes['blockClass'] ?? '',
      'media' => $media,
    ]
  ) );
  ?>
</div>
