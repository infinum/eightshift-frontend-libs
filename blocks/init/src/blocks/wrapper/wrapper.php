<?php
/**
 * Template for the Wrapping Advance block.
 *
 * @package Eightshift_Boilerplate\Blocks.
 */

namespace Eightshift_Boilerplate\Blocks;

use Eightshift_Libs\Helpers\Components;

// Used to add or remove wrapper.
$wrapper_use        = $attributes['wrapperUse'] ?? true;
$wrapper_use_simple = $attributes['wrapperUseSimple'] ?? false;
$wrapper_disable    = $attributes['wrapperDisable'] ?? false;

if ( ! $wrapper_use && $wrapper_disable ) {
  $this->render_wrapper_view(
    $template_path,
    $attributes,
    $inner_block_content
  );

  return;
}

$id = $attributes['id'] ?? '';

$wrapper_main_class = 'wrapper';

$wrapper_class = Components::classnames([
  $wrapper_main_class,
  ! empty( $attributes['wrapperBackgroundColor'] ) ? "{$wrapper_main_class}__bg-color--{$attributes['wrapperBackgroundColor']}" : '',
  $attributes['wrapperSpacingTop'] ? Components::responsive_selectors($attributes['wrapperSpacingTop'], 'spacing-top', $wrapper_main_class) : '',
  $attributes['wrapperSpacingBottom'] ? Components::responsive_selectors($attributes['wrapperSpacingBottom'], 'spacing-bottom', $wrapper_main_class) : '',
  $attributes['wrapperHideBlock'] ? Components::responsive_selectors($attributes['wrapperHideBlock'], 'hide-block', $wrapper_main_class, false) : '',
]);

$wrapper_container_class = Components::classnames([
  "{$wrapper_main_class}__container",
  $attributes['wrapperContainerWidth'] ? Components::responsive_selectors($attributes['wrapperContainerWidth'], 'container-width', $wrapper_main_class) : '',
  $attributes['wrapperGutter'] ? Components::responsive_selectors($attributes['wrapperGutter'], 'gutter', $wrapper_main_class) : '',
]);

$wrapper_inner_class = Components::classnames([
  "{$wrapper_main_class}__inner",
  $attributes['wrapperWidth'] ? Components::responsive_selectors($attributes['wrapperWidth'], 'width', $wrapper_main_class) : '',
  $attributes['wrapperOffset'] ? Components::responsive_selectors($attributes['wrapperOffset'], 'offset', $wrapper_main_class) : '',
]);

?>
<div class="<?php echo esc_attr( $wrapper_class ); ?>" id="<?php echo esc_attr( $id ); ?>">
  <?php if ( $wrapper_use_simple ) { ?>
    <?php
      $this->render_wrapper_view(
        $template_path,
        $attributes,
        $inner_block_content
      );
    ?>
  <?php } else { ?>
    <div class="<?php echo esc_attr( $wrapper_container_class ); ?>">
      <div class="<?php echo esc_attr( $wrapper_inner_class ); ?>">
        <?php
          $this->render_wrapper_view(
            $template_path,
            $attributes,
            $inner_block_content
          );
        ?>
      </div>
    </div>
  <?php } ?>
</div>
