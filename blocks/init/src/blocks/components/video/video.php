<?php
/**
 * Template for the Video Component.
 *
 * @package EightshiftBoilerplate\Blocks.
 */

namespace EightshiftBoilerplate\Blocks;

$media = $attributes['media'] ?? [];

if ( ! $media ) {
  return;
}

$url = $media['url'] ?? '';

if ( ! $url ) {
  return;
}

$block_class = $attributes['blockClass'] ?? '';

?>

<video
  src="<?php echo esc_url( $url ); ?>"
  class="<?php echo esc_attr( "video {$block_class}__video" ); ?>"
  autoplay
  loop
  muted
  playsinline
  preload="metadata">
</video>
