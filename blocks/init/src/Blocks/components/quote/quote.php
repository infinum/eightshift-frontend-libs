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

$componentClass = $manifest['componentClass'] ?? '';
$additionalClass = $attributes['additionalClass'] ?? '';
$blockClass = $attributes['blockClass'] ?? '';
$selectorClass = $attributes['selectorClass'] ?? $componentClass;

$quoteClass = Components::classnames([
	Components::selector($componentClass, $componentClass),
	Components::selector($blockClass, $blockClass, $selectorClass),
	Components::selector($additionalClass, $additionalClass),
]);

?>

<figure class="<?php echo \esc_attr($quoteClass); ?>">
	<i class="<?php echo \esc_attr("{$componentClass}__icon"); ?>">
		<?php echo $manifest['resources']['icon']; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
	</i>

	<blockquote class="<?php echo \esc_attr("{$componentClass}__content"); ?>">
		<?php
		echo Components::render( // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			'heading',
			Components::props('heading', $attributes, [
				'blockClass' => $componentClass
			])
		);
		?>
	</blockquote>

	<div class="<?php echo \esc_attr("{$componentClass}__separator"); ?>"></div>

	<figcaption class="<?php echo \esc_attr("{$componentClass}__caption"); ?>">
		<?php
		echo Components::render( // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			'paragraph',
			Components::props('paragraph', $attributes, [
				'blockClass' => $componentClass
			])
		);
		?>
	</figcaption>
</figure>
