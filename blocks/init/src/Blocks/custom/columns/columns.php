<?php

/**
 * Template for the Columns Block.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$blockClass = $attributes['blockClass'] ?? '';

$componentClass = Components::classnames([
	$blockClass,
	$attributes['gutter'] ? Components::responsiveSelectors($attributes['gutter'], 'gutter', $blockClass) : '',
	$attributes['verticalSpacing'] ? Components::responsiveSelectors($attributes['verticalSpacing'], 'vertical-spacing', $blockClass) : '',
]);
?>

<div class="<?php echo \esc_attr($componentClass); ?>">
	<?php echo \wp_kses_post($innerBlockContent); ?>
</div>
