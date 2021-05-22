<?php

/**
 * Template for the Lists Component.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$globalManifest = Components::getManifest(dirname(__DIR__, 2));
$manifest = Components::getManifest(__DIR__);
$componentName = $attributes['componentName'] ?? $manifest['componentName'];

$listsUse = Components::checkAttr('listsUse', $attributes, $manifest, $componentName);
if (!$listsUse) {
	return;
}

$unique = Components::getUnique();
echo Components::outputCssVariables($attributes, $manifest, $unique, $globalManifest); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped

$componentClass = $attributes['componentClass'] ?? $manifest['componentClass'];
$selectorClass = $attributes['selectorClass'] ?? $componentClass;
$blockClass = $attributes['blockClass'] ?? '';

$listsContent = Components::checkAttr('listsContent', $attributes, $manifest, $componentName);
$listsOrdered = Components::checkAttr('listsOrdered', $attributes, $manifest, $componentName);

$listsClass = Components::classnames([
	$componentClass,
	Components::selector($blockClass, $blockClass, $selectorClass),
]);

?>

<<?php echo esc_attr($listsOrdered); ?> class="<?php echo esc_attr($listsClass); ?>" data-id="<?php echo esc_attr($unique); ?>">
	<?php echo wp_kses_post($listsContent); ?>
</<?php echo esc_attr($listsOrdered); ?>>
