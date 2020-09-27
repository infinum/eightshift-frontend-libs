<?php

/**
 * Template for the Column Block.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$blockClass = $attributes['blockClass'] ?? '';

$componentClass = Components::classnames(
	[
	$blockClass,
	$attributes['width'] ? Components::responsiveSelectors($attributes['width'], 'width', $blockClass) : '',
	$attributes['offset'] ? Components::responsiveSelectors($attributes['offset'], 'offset', $blockClass) : '',
	$attributes['hide'] ? Components::responsiveSelectors($attributes['hide'], 'hide', $blockClass, false) : '',
	]
);
?>

<div class="<?php echo \esc_attr($componentClass); ?>">
	<?php echo \wp_kses_post($innerBlockContent); ?>
</div>
