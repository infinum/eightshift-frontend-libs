<?php

/**
 * Template for the Video Button Component.
 *
 * @package EightshiftBoilerplate.
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$manifest = Components::getManifest(__DIR__);

$videoButtonUse = Components::checkAttr('videoButtonUse', $attributes, $manifest);
if (!$videoButtonUse) {
	return;
}

$componentClass = $attributes['componentClass'] ?? $manifest['componentClass'];
$selectorClass = $attributes['selectorClass'] ?? $componentClass;
$blockClass = $attributes['blockClass'] ?? '';

$videoButtonModalId = Components::checkAttr('videoButtonModalId', $attributes, $manifest);
$videoButtonLabel = Components::checkAttr('videoButtonLabel', $attributes, $manifest);
$icon = $manifest['options']['icon'] ?? '';

$videoButtonClass = Components::classnames([
	$componentClass,
	Components::selectorB($blockClass, $selectorClass),
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
