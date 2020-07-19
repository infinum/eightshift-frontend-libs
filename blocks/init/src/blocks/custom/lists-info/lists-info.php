<?php
/**
 * Template for the Lists Info Block.
 *
 * @package EightshiftBoilerplate\Blocks.
 */

namespace EightshiftBoilerplate\Blocks;

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
    $this->render_block_view(
      '/components/lists/lists.php',
      [
        'blockClass' => $attributes['blockClass'] ?? '',
        'lists'      => $attributes['lists'] ?? [],
      ]
    );
    ?>
  </div>
</div>
