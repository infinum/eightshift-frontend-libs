<?php
/**
 * Main footer component
 *
 * @package Eightshift_Boilerplate\Blocks
 *
 * @since 1.0.0
 */

namespace Eightshift_Boilerplate\Blocks;

use Eightshift_Libs\Blocks\Helpers\Components;

$block_class      = $attributes['blockClass'] ?? 'footer';
$left_component   = ! empty( $attributes['leftComponent'] ) ? Components::ensure_string( $attributes['leftComponent'] ) : '';
$center_component = ! empty( $attributes['centerComponent'] ) ? Components::ensure_string( $attributes['centerComponent'] ) : '';
$right_component  = ! empty( $attributes['rightComponent'] ) ? Components::ensure_string( $attributes['rightComponent'] ) : '';

?>
<footer class="<?php echo esc_attr( $block_class ); ?>">
  <div class="<?php echo esc_attr( "{$block_class}__wrapper" ); ?>">
    <div class="<?php echo esc_attr( "{$block_class}__column {$block_class}__column--left" ); ?>">
      <?php echo wp_kses_post( $left_component ); ?>
    </div>
    <div class="<?php echo esc_attr( "{$block_class}__column {$block_class}__column--center" ); ?>">
      <?php echo wp_kses_post( $center_component ); ?>
    </div>
    <div class="<?php echo esc_attr( "{$block_class}__column {$block_class}__column--right" ); ?>">
      <?php echo wp_kses_post( $right_component ); ?>
    </div>
  </div>
</footer>
