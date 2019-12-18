<?php
/**
 * Template for the Lists Component.
 *
 * @since 1.0.0
 * @package Eightshift_Boilerplate\Blocks.
 */

namespace Eightshift_Boilerplate\Blocks;

$lists = $attributes['lists'] ?? [];

if ( ! $lists ) {
  return;
}

$content = $lists['content'] ?? '';
$ordered = $lists['ordered'] ?? 'ul';

$component_class = 'lists';
$block_class     = $attributes['blockClass'] ?? '';

$lists_class = "
  {$component_class}
  {$block_class}__lists
";

?>

<<?php echo esc_attr( $ordered ); ?> class="<?php echo esc_attr( $lists_class ); ?>">
    <?php echo wp_kses_post( $content ); ?>
</<?php echo esc_attr( $ordered ); ?>>
