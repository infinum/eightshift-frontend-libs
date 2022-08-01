<?php

/**
 * Template for the Wrapping Advance block.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$manifest = Components::getWrapper();

$wrapperDisable = Components::checkAttr('wrapperDisable', $attributes, $manifest);

if ($wrapperDisable) {
	echo $wrapperChildren;

	return;
}

$componentClass = $manifest['componentClass'];

$blockWrapClass = Components::checkAttr('blockWrapClass', $attributes, $manifest);

$customBlockName = Components::getSettingsGlobalVariablesCustomBlockName();

$wrapperClass = Components::classnames([
	$componentClass,
	$customBlockName,
	$blockWrapClass,
]);

$unique = Components::getUnique();

?>
<div class="<?php echo \esc_attr($wrapperClass); ?>" data-id="<?php echo \esc_attr($unique); ?>">
	<?php
	echo Components::outputCssVariables($attributes, $manifest, $unique, [], $componentClass);

	echo $wrapperChildren;
	?>
</div>


