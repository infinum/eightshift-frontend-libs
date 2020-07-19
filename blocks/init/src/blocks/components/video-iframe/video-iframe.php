<?php
/**
 * Template for the Video Iframe Component.
 *
 * @package EightshiftBoilerplate\Blocks.
 */

namespace EightshiftBoilerplate\Blocks;

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$url          = $attributes['url'] ?? '';
$id           = $attributes['id'] ?? '';
$block_class  = $attributes['blockClass'] ?? '';
$aspect_ratio = $attributes['aspectRatio'] ?? 'default';

if ( empty( $url ) || empty( $id ) ) {
  return;
}

$component_class    = 'video-iframe';
$aspect_ratio_class = isset( $attributes['aspectRatio'] ) ? "{$component_class}__video-ratio--{$attributes['aspectRatio']}" : '';

$video_class = Components::classnames(
  [
    $component_class,
    $aspect_ratio_class,
    "{$block_class}__{$component_class}",
  ]
);

?>

<div class="<?php echo esc_attr( $video_class ); ?>">
  <iframe
    class="<?php echo esc_attr( "{$component_class}__iframe" ); ?>"
    src="<?php echo esc_url( $url ); ?><?php echo esc_attr( $id ); ?>"
    frameBorder="0"
    allow="autoplay; fullscreen"
    allowFullScreen
  ></iframe>
</div>
