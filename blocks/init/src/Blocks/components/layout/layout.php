<?php

/**
 * Layout component view.
 *
 * @package %g_namespace%
 */

use %g_namespace_vendor_prefix%\EightshiftLibs\Helpers\Helpers;

$manifest = Helpers::getManifestByDir(__DIR__);

$layoutUse = Helpers::checkAttr('layoutUse', $attributes, $manifest);
if (!$layoutUse) {
	return;
}

$componentClass = $manifest['componentClass'] ?? '';
$additionalClass = $attributes['additionalClass'] ?? '';
$blockClass = $attributes['blockClass'] ?? '';
$selectorClass = $attributes['selectorClass'] ?? $componentClass;

$layoutItems = Helpers::checkAttr('layoutItems', $attributes, $manifest);
$layoutTag = Helpers::checkAttr('layoutTag', $attributes, $manifest);
$layoutType = Helpers::checkAttr('layoutType', $attributes, $manifest);
$layoutLoadMoreId = Helpers::checkAttr('layoutLoadMoreId', $attributes, $manifest);

$layoutClass = Helpers::classnames([
	Helpers::selector($componentClass, $componentClass),
	Helpers::selector($blockClass, $blockClass, $selectorClass),
	Helpers::selector($additionalClass, $additionalClass),
]);

$unique = Helpers::getUnique();

?>

<?php echo Helpers::outputCssVariables($attributes, $manifest, $unique); ?>
<<?php echo esc_attr($layoutTag); ?>
	class="<?php echo esc_attr($layoutClass); ?>"
	data-id="<?php echo esc_attr($unique); ?>"
	data-layout-type="<?php echo esc_attr($layoutType); ?>"
>
	<div
		class="<?php echo esc_attr("{$componentClass}__wrap"); ?>"
		data-load-more-id="<?php echo esc_attr($layoutLoadMoreId); ?>"
	>
		<?php
		// phpcs:ignore Eightshift.Security.ComponentsEscape.OutputNotEscaped
		echo Helpers::ensureString($layoutItems);
		?>
	</div>
</<?php echo esc_attr($layoutTag); ?>>
