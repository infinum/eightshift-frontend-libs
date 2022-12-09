<?php

/**
 * Template for the Lists Component.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$globalManifest = Components::getManifest(dirname(__DIR__, 2));
$manifest = Components::getManifest(__DIR__);

$listsUse = Components::checkAttr('listsUse', $attributes, $manifest);
if (!$listsUse) {
	return;
}

$unique = Components::getUnique();

$componentClass = $manifest['componentClass'] ?? '';
$additionalClass = $attributes['additionalClass'] ?? '';
$blockClass = $attributes['blockClass'] ?? '';
$selectorClass = $attributes['selectorClass'] ?? $componentClass;

$listsContent = Components::checkAttr('listsContent', $attributes, $manifest);
$listsOrdered = Components::checkAttr('listsOrdered', $attributes, $manifest);

$listsOrderedOptions = array_map(fn($option) => $option['value'], $manifest['options']['listsOrdered'] ?? []); // @phpstan-ignore-line

if (!in_array($listsOrdered, $listsOrderedOptions, true)) {
	return;
}

$listsClass = Components::classnames([
	Components::selector($componentClass, $componentClass),
	Components::selector($blockClass, $blockClass, $selectorClass),
	Components::selector($additionalClass, $additionalClass),
]);

?>

<<?php echo esc_attr($listsOrdered); ?> class="<?php echo esc_attr($listsClass); ?>" data-id="<?php echo esc_attr($unique); ?>">
	<?php
		// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		echo Components::outputCssVariables($attributes, $manifest, $unique, $globalManifest),

		// phpcs:ignore Eightshift.Security.ComponentsEscape.OutputNotEscaped
		$listsContent;
	?>
</<?php echo esc_attr($listsOrdered); ?>>
