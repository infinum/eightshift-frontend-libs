<?php

/**
 * Template for the Video Button Component.
 *
 * @package EightshiftBoilerplate.
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$manifest = Components::getManifest(__DIR__);
$componentName = $attributes['componentName'] ?? $manifest['componentName'];

$videoButtonUse = Components::checkAttr('videoButtonUse', $attributes, $manifest, $componentName);
if (!$videoButtonUse) {
	return;
}

$componentClass = $attributes['componentClass'] ?? $manifest['componentClass'];
$selectorClass = $attributes['selectorClass'] ?? $componentClass;
$blockClass = $attributes['blockClass'] ?? '';

$videoButtonModalId = Components::checkAttr('videoButtonModalId', $attributes, $manifest, $componentName);
$videoButtonLabel = Components::checkAttr('videoButtonLabel', $attributes, $manifest, $componentName);
$icon = $manifest['options']['icon'] ?? '';

$videoButtonClass = Components::classnames([
	$componentClass,
	Components::selector($blockClass, $blockClass, $selectorClass),
]);

?>

<button
	class="<?php echo \esc_attr($videoButtonClass); ?>"
	role="button"
	tabindex="0"
	data-micromodal-trigger="<?php echo \esc_attr($videoButtonModalId); ?>"
	aria-label="<?php echo \esc_html($videoButtonLabel); ?>"
>
	<?php echo \wp_kses_post($icon); ?>
</button>
