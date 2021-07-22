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

$componentClass = $manifest['componentClass'] ?? '';
$additionalClass = $attributes['additionalClass'] ?? '';
$blockClass = $attributes['blockClass'] ?? '';
$selectorClass = $attributes['selectorClass'] ?? $componentClass;

$videoButtonModalId = Components::checkAttr('videoButtonModalId', $attributes, $manifest);
$videoButtonLabel = Components::checkAttr('videoButtonLabel', $attributes, $manifest);

$videoButtonClass = Components::classnames([
	Components::selector($componentClass, $componentClass),
	Components::selector($blockClass, $blockClass, $selectorClass),
	Components::selector($additionalClass, $additionalClass),
]);

?>

<button
	class="<?php echo \esc_attr($videoButtonClass); ?>"
	role="button"
	tabindex="0"
	data-micromodal-trigger="<?php echo \esc_attr($videoButtonModalId); ?>"
	aria-label="<?php echo \esc_html($videoButtonLabel); ?>"
>
	<?php echo $manifest['icon']; ?>
</button>
