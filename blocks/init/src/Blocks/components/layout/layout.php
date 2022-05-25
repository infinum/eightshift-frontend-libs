<?php

/**
 * Layout component - Grid Columns grid.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$manifest = Components::getManifest(__DIR__);

$layoutUse = Components::checkAttr('layoutUse', $attributes, $manifest);
if (!$layoutUse) {
	return;
}

$componentClass = $manifest['componentClass'] ?? '';
$additionalClass = $attributes['additionalClass'] ?? '';
$blockClass = $attributes['blockClass'] ?? '';
$selectorClass = $attributes['selectorClass'] ?? $componentClass;

$layoutItems = Components::checkAttr('layoutItems', $attributes, $manifest);
$layoutTag = Components::checkAttr('layoutTag', $attributes, $manifest);
$layoutType = Components::checkAttr('layoutType', $attributes, $manifest);

$layoutClass = Components::classnames([
	Components::selector($componentClass, $componentClass),
	Components::selector($blockClass, $blockClass, $selectorClass),
	Components::selector($additionalClass, $additionalClass),
]);

$unique = Components::getUnique();

?>

<<?php echo esc_attr($layoutTag); ?>
	class="<?php echo esc_attr($layoutClass); ?>"
	data-id="<?php echo esc_attr($unique); ?>"
	data-layout-type="<?php echo esc_attr($layoutType); ?>"
>
	<?php echo Components::outputCssVariables($attributes, $manifest, $unique); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
	<div class="<?php echo esc_attr("{$componentClass}__wrap"); ?>">
		<?php echo Components::ensureString($layoutItems); // phpcs:ignore Eightshift.Security.ComponentsEscape.OutputNotEscaped ?>
	</div>
</<?php echo esc_attr($layoutTag); ?>>
