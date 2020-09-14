<?php
/**
 * Template for the Lists Info Block.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$blockClass = $attributes['blockClass'] ?? '';
$title      = $attributes['title'] ?? '';

?>

<div class="<?php echo esc_attr( $blockClass ); ?>">
  <div class="<?php echo esc_attr( "{$blockClass}__intro" ); ?>">
    <?php if ( ! empty( $title ) ) { ?>
      <div class="<?php echo esc_attr( "{$blockClass}__title" ); ?>">
        <?php echo wp_kses_post( $title ); ?>
      </div>
    <?php } ?>
  </div>

  <div class="<?php echo esc_attr( "{$blockClass}__content" ); ?>">
    <?php
    echo wp_kses_post( Components::render( 'lists', [
        'blockClass' => $attributes['blockClass'] ?? '',
        'lists'      => $attributes['lists'] ?? [],
      ]
    ) );
    ?>
  </div>
</div>
