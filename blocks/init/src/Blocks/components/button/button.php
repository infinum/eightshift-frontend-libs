<?php

/**
 * Template for the Button Component.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$globalManifest = Components::getManifest(dirname(__DIR__, 2));
$manifest = Components::getManifest(__DIR__);

$buttonUse = Components::checkAttr('buttonUse', $attributes, $manifest);
if (!$buttonUse) {
	return;
}

$unique = Components::getUnique();
echo Components::outputCssVariables($attributes, $manifest, $unique, $globalManifest); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped

$componentClass = $manifest['componentClass'] ?? '';
$additionalClass = $attributes['additionalClass'] ?? '';
$blockClass = $attributes['blockClass'] ?? '';
$selectorClass = $attributes['selectorClass'] ?? $componentClass;

$buttonUrl = Components::checkAttr('buttonUrl', $attributes, $manifest);
$buttonContent = Components::checkAttr('buttonContent', $attributes, $manifest);
$buttonIsAnchor = Components::checkAttr('buttonIsAnchor', $attributes, $manifest);
$buttonId = Components::checkAttr('buttonId', $attributes, $manifest);
$buttonIsNewTab = Components::checkAttr('buttonIsNewTab', $attributes, $manifest);
$buttonAriaLabel = Components::checkAttr('buttonAriaLabel', $attributes, $manifest);
$buttonAttrs = (array)Components::checkAttr('buttonAttrs', $attributes, $manifest);

if ($buttonIsNewTab) {
	$buttonAttrs = array_merge(
		[
			'target' => '_blank',
			'rel' => '"noopener noreferrer"',
		],
		$buttonAttrs
	);
}

$buttonClass = Components::classnames([
	Components::selector($componentClass, $componentClass),
	Components::selector($blockClass, $blockClass, $selectorClass),
	Components::selector($additionalClass, $additionalClass),
	Components::selector($buttonIsAnchor, 'js-scroll-to-anchor'),
]);

?>

<?php if (! $buttonUrl) { ?>
	<button
		class="<?php echo \esc_attr($buttonClass); ?>"
		id="<?php echo \esc_attr($buttonId); ?>"
		title="<?php echo \esc_attr($buttonContent); ?>"
		<?php if (!empty($buttonAriaLabel)) { ?>
			aria-label="<?php echo \esc_attr($buttonAriaLabel); ?>"
		<?php } ?>
		data-id="<?php echo esc_attr($unique); ?>"
		<?php
		foreach ($buttonAttrs as $key => $value) {
			echo \wp_kses_post("{$key}=" . $value . " ");
		}
		?>
	>
		<?php echo \esc_html($buttonContent); ?>
	</button>

<?php } else { ?>
	<a
		href="<?php echo \esc_url($buttonUrl); ?>"
		class="<?php echo \esc_attr($buttonClass); ?>"
		id="<?php echo \esc_attr($buttonId); ?>"
		title="<?php echo \esc_attr($buttonContent); ?>"
		<?php if (!empty($buttonAriaLabel)) { ?>
			aria-label="<?php echo \esc_attr($buttonAriaLabel); ?>"
		<?php } ?>
		data-id="<?php echo esc_attr($unique); ?>"
		<?php
		foreach ($buttonAttrs as $key => $value) {
			echo \wp_kses_post("{$key}=" . $value . " ");
		}
		?>
	>
		<?php echo \esc_html($buttonContent); ?>
	</a>
<?php } ?>
