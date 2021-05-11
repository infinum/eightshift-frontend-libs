<?php

/**
 * Template for the Button Component.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$globalManifest = Components::getManifest(dirname(__DIR__, 2));
$manifest = Components::getManifest(__DIR__);
$componentName = $attributes['componentName'] ?? $manifest['componentName'];

$buttonUse = Components::checkAttr('buttonUse', $attributes, $manifest, $componentName);
if (!$buttonUse) {
	return;
}

$unique = Components::getUnique();
echo Components::outputCssVariables($attributes, $manifest, $unique, $globalManifest); // phpcs:ignore Eightshift.Security.CustomEscapeOutput.OutputNotEscaped

$componentClass = $attributes['componentClass'] ?? $manifest['componentClass'];
$selectorClass = $attributes['selectorClass'] ?? $componentClass;
$blockClass = $attributes['blockClass'] ?? '';

$buttonUrl = Components::checkAttr('buttonUrl', $attributes, $manifest, $componentName);
$buttonContent = Components::checkAttr('buttonContent', $attributes, $manifest, $componentName);
$buttonIsAnchor = Components::checkAttr('buttonIsAnchor', $attributes, $manifest, $componentName);
$buttonId = Components::checkAttr('buttonId', $attributes, $manifest, $componentName);
$buttonIsNewTab = Components::checkAttr('buttonIsNewTab', $attributes, $manifest, $componentName);
$buttonAriaLabel = Components::checkAttr('buttonAriaLabel', $attributes, $manifest, $componentName);
$buttonAttrs = Components::checkAttr('buttonAttrs', $attributes, $manifest, $componentName);
$buttonIsLink = Components::checkAttr('buttonIsLink', $attributes, $manifest, $componentName);

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
	$componentClass,
	Components::selector($buttonIsLink, $componentClass, 'is-link'),
	Components::selector($buttonIsAnchor, 'js-scroll-to-anchor'),
	Components::selector($blockClass, $blockClass, $selectorClass),
]);

?>

<?php if (! $buttonUrl) { ?>
	<button
		class="<?php echo \esc_attr($buttonClass); ?>"
		id="<?php echo \esc_attr($buttonId); ?>"
		title="<?php echo \esc_attr($buttonContent); ?>"
		aria-label="<?php echo \esc_attr($buttonAriaLabel); ?>"
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
		aria-label="<?php echo \esc_attr($buttonAriaLabel); ?>"
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
