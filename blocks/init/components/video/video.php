<?php
/**
 * Template for the Video Component.
 *
 * @since 1.0.0
 * @package Eightshift_Boilerplate\Blocks.
 */

namespace Eightshift_Boilerplate\Blocks;

$media = $attributes['media'] ?? [];
if ( ! isset( $media['url'] ) && ! empty( $media['url'] ) ) {
  return;
}

$component_class = 'video';
$block_class     = $attributes['blockClass'] ?? '';

$video_class = "
  {$component_class}
  {$block_class}__video
";

?>

<video
  src="<?php echo esc_url( $media['url'] ); ?>"
  class="<?php echo esc_attr( $video_class ); ?>"
  autoplay
  loop
  muted
  playsinline
  preload="metadata">
</video>
