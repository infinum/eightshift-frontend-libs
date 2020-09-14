<?php
/**
 * Template for the Wrapping Advance block.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

// Used to add or remove wrapper.
$wrapperUse       = $attributes['wrapperUse'] ?? true;
$wrapperUseSimple = $attributes['wrapperUseSimple'] ?? false;
$wrapperDisable   = $attributes['wrapperDisable'] ?? false;

if ( ! $wrapperUse || $wrapperDisable ) {
  $this->renderWrapperView(
    $template_path,
    $attributes,
    $innerBlockContent
  );

  return;
}

$id = $attributes['id'] ?? '';

$wrapperMainClass = 'wrapper';

$wrapperClass = Components::classnames([
  $wrapperMainClass,
  ! empty( $attributes['wrapperBackgroundColor'] ) ? "{$wrapperMainClass}__bg-color--{$attributes['wrapperBackgroundColor']}" : '',
  $attributes['wrapperSpacingTop'] ? Components::responsiveSelectors($attributes['wrapperSpacingTop'], 'spacing-top', $wrapperMainClass) : '',
  $attributes['wrapperSpacingBottom'] ? Components::responsiveSelectors($attributes['wrapperSpacingBottom'], 'spacing-bottom', $wrapperMainClass) : '',
  $attributes['wrapperHideBlock'] ? Components::responsiveSelectors($attributes['wrapperHideBlock'], 'hide-block', $wrapperMainClass, false) : '',
]);

$wrapperContainerClass = Components::classnames([
  "{$wrapperMainClass}__container",
  $attributes['wrapperContainerWidth'] ? Components::responsiveSelectors($attributes['wrapperContainerWidth'], 'container-width', $wrapperMainClass) : '',
  $attributes['wrapperGutter'] ? Components::responsiveSelectors($attributes['wrapperGutter'], 'gutter', $wrapperMainClass) : '',
]);

$wrapperInnerClass = Components::classnames([
  "{$wrapperMainClass}__inner",
  $attributes['wrapperWidth'] ? Components::responsiveSelectors($attributes['wrapperWidth'], 'width', $wrapperMainClass) : '',
  $attributes['wrapperOffset'] ? Components::responsiveSelectors($attributes['wrapperOffset'], 'offset', $wrapperMainClass) : '',
]);

?>
<div class="<?php echo esc_attr( $wrapperClass ); ?>" id="<?php echo esc_attr( $id ); ?>">
  <?php if ( $wrapperUseSimple ) { ?>
    <?php
      $this->renderWrapperView(
        $template_path,
        $attributes,
        $innerBlockContent
      );
    ?>
  <?php } else { ?>
    <div class="<?php echo esc_attr( $wrapperContainerClass ); ?>">
      <div class="<?php echo esc_attr( $wrapperInnerClass ); ?>">
        <?php
          $this->renderWrapperView(
            $template_path,
            $attributes,
            $innerBlockContent
          );
        ?>
      </div>
    </div>
  <?php } ?>
</div>
