<?php

/**
 * Template for the %block-name-title-case% Component.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$globalManifest = Components::getManifest(dirname(__DIR__, 2));
$manifest = Components::getManifest(__DIR__);

$%block-name-camel-case%Use = Components::checkAttr('%block-name-camel-case%Use', $attributes, $manifest);
if (!$%block-name-camel-case%Use) {
	return;
}

$unique = Components::getUnique();

$componentClass = $manifest['componentClass'] ?? '';
$additionalClass = $attributes['additionalClass'] ?? '';
$blockClass = $attributes['blockClass'] ?? '';
$selectorClass = $attributes['selectorClass'] ?? $componentClass;

$%block-name-camel-case%Content = Components::checkAttr('%block-name-camel-case%Content', $attributes, $manifest);

if (!$%block-name-camel-case%Content) {
	return;
}

$%block-name-camel-case%Class = Components::classnames([
	Components::selector($componentClass, $componentClass),
	Components::selector($blockClass, $blockClass, $selectorClass),
	Components::selector($additionalClass, $additionalClass),
]);
?>

<?php echo Components::outputCssVariables($attributes, $manifest, $unique, $globalManifest); ?>

<p class="<?php echo esc_attr($%block-name-camel-case%Class); ?>" data-id="<?php echo esc_attr($unique); ?>">
	<?php
		// phpcs:ignore Eightshift.Security.ComponentsEscape.OutputNotEscaped
		echo $%block-name-camel-case%Content;
	?>
</p>
