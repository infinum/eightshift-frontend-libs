<?php
/**
 * Template for the Lists Info Block.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$block_class = $attributes['blockClass'] ?? '';
$title       = $attributes['title'] ?? '';

?>

<div class="<?php echo esc_attr( $block_class ); ?>">
  <div class="<?php echo esc_attr( "{$block_class}__intro" ); ?>">
    <?php if ( ! empty( $title ) ) { ?>
      <div class="<?php echo esc_attr( "{$block_class}__title" ); ?>">
        <?php echo wp_kses_post( $title ); ?>
      </div>
    <?php } ?>
  </div>

  <div class="<?php echo esc_attr( "{$block_class}__content" ); ?>">
    <?php
    echo wp_kses_post( Components::render( 'lists', [
        'blockClass' => $attributes['blockClass'] ?? '',
        'lists'      => $attributes['lists'] ?? [],
      ]
    ) );
    ?>
  </div>
</div>
