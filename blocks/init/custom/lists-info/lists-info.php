<?php
/**
 * Template for the Lists Info Block.
 *
 * @since 1.0.0
 * @package Infinum\Blocks.
 */

namespace Infinum\Blocks;

$block_class = $attributes['blockClass'] ?? '';
$title       = $attributes['title'] ?? '';

$intro_class   = "{$block_class}__intro";
$title_class   = "{$block_class}__title";
$content_class = "{$block_class}__content";

?>

<div class="<?php echo esc_attr( $block_class ); ?>">
  <div class="<?php echo esc_attr( $intro_class ); ?>">
    <?php if ( ! empty( $title ) ) { ?>
      <div class="<?php echo esc_attr( $title_class ); ?>">
        <?php echo wp_kses_post( $title ); ?>
      </div>
    <?php } ?>
  </div>

  <div class="<?php echo esc_attr( $content_class ); ?>">
    <?php
    $this->render_block_view(
      '/components/lists/lists.php',
      [
        'blockClass' => $attributes['blockClass'] ?? '',
        'content'    => $attributes['content'] ?? '',
        'ordered'    => $attributes['ordered'] ?? '',
      ]
    );
    ?>
  </div>
</div>
