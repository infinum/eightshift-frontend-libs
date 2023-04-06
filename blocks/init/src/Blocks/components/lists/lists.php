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
$listsType = Components::checkAttr('listsOrdered', $attributes, $manifest);

$listsTypeOptions = array_map(static fn($option) => $option['value'], $manifest['options']['listsOrdered'] ?? []); // @phpstan-ignore-line

if (!in_array($listsType, $listsTypeOptions, true)) {
	return;
}

$listsClass = Components::classnames([
	Components::selector($componentClass, $componentClass),
	Components::selector($blockClass, $blockClass, $selectorClass),
	Components::selector($additionalClass, $additionalClass),
]);

?>

<<?php echo esc_attr($listsType); ?>
	class="<?php echo esc_attr($listsClass); ?>"
	data-id="<?php echo esc_attr($unique); ?>"
>
	<?php
		echo Components::outputCssVariables($attributes, $manifest, $unique, $globalManifest), $listsContent;
	?>
</<?php echo esc_attr($listsType); ?>>
