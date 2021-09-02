<?php

/**
 * Template for the Quote Component.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$globalManifest = Components::getManifest(dirname(__DIR__, 2));
$manifest = Components::getManifest(__DIR__);

$quoteUse = Components::checkAttr('quoteUse', $attributes, $manifest);
if (!$quoteUse) {
	return;
}

$unique = Components::getUnique();

$componentClass = $manifest['componentClass'] ?? '';
$additionalClass = $attributes['additionalClass'] ?? '';
$blockClass = $attributes['blockClass'] ?? '';
$selectorClass = $attributes['selectorClass'] ?? $componentClass;

$quoteContent = Components::checkAttr('quoteContent', $attributes, $manifest);
$quoteCaption = Components::checkAttr('quoteCaption', $attributes, $manifest);

$quoteClass = Components::classnames([
	Components::selector($componentClass, $componentClass),
	Components::selector($blockClass, $blockClass, $selectorClass),
	Components::selector($additionalClass, $additionalClass),
]);

?>

<figure class="<?php echo \esc_attr($quoteClass); ?>" data-id="<?php echo \esc_attr($unique); ?>">
	<?php
		echo Components::outputCssVariables($attributes, $manifest, $unique, $globalManifest); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
	?>

	<i class="<?php echo \esc_attr("{$componentClass}__icon"); ?>">
		<?php echo $manifest['resources']['icon']; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
	</i>

	<quote class="<?php echo \esc_attr("{$componentClass}__content"); ?>">
		<?php echo \wp_kses_post($quoteContent); ?>
	</quote>

	<div class="<?php echo \esc_attr("{$componentClass}__separator"); ?>"></div>

	<figcaption class="<?php echo \esc_attr("{$componentClass}__caption"); ?>">
		<?php echo \wp_kses_post($quoteCaption); ?>
	</figcaption>
</figure>
