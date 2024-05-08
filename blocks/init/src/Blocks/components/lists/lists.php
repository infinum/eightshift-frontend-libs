<?php

/**
 * Template for the Lists Component.
 *
 * @package %g_namespace%
 */

use %g_namespace_vendor_prefix%\EightshiftLibs\Helpers\Helpers;

$manifest = Helpers::getManifestByDir(__DIR__);

$listsUse = Helpers::checkAttr('listsUse', $attributes, $manifest);
if (!$listsUse) {
	return;
}

$unique = Helpers::getUnique();

$componentClass = $manifest['componentClass'] ?? '';
$additionalClass = $attributes['additionalClass'] ?? '';
$blockClass = $attributes['blockClass'] ?? '';
$selectorClass = $attributes['selectorClass'] ?? $componentClass;

$listsContent = Helpers::checkAttr('listsContent', $attributes, $manifest);
$listsType = Helpers::checkAttr('listsOrdered', $attributes, $manifest);

$listsTypeOptions = array_map(static fn($option) => $option['value'], $manifest['options']['listsOrdered'] ?? []); // @phpstan-ignore-line

if (!in_array($listsType, $listsTypeOptions, true)) {
	return;
}

$listsClass = Helpers::classnames([
	Helpers::selector($componentClass, $componentClass),
	Helpers::selector($blockClass, $blockClass, $selectorClass),
	Helpers::selector($additionalClass, $additionalClass),
]);

?>

<<?php echo esc_attr($listsType); ?>
	class="<?php echo esc_attr($listsClass); ?>"
	data-id="<?php echo esc_attr($unique); ?>"
>
	<?php
		echo Helpers::outputCssVariables($attributes, $manifest, $unique), $listsContent;
	?>
</<?php echo esc_attr($listsType); ?>>
