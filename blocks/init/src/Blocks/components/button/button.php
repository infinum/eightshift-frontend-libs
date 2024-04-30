<?php

/**
 * Template for the Button Component.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$manifest = Components::getManifest(__DIR__);

$buttonUse = Components::checkAttr('buttonUse', $attributes, $manifest);
if (!$buttonUse) {
	return;
}

$unique = Components::getUnique();

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

$buttonAttrs['title'] = $buttonContent;
$buttonAttrs['data-id'] = $unique;

if (!empty($buttonUrl)) {
	$buttonAttrs['href'] = $buttonUrl;
}

if ($buttonIsNewTab) {
	$buttonAttrs['target'] = '_blank';
	$buttonAttrs['rel'] = '"noopener noreferrer"';
}

if (!empty($buttonId)) {
	$buttonAttrs['id'] = $buttonId;
}

if (!empty($buttonAriaLabel)) {
	$buttonAttrs['aria-label'] = $buttonAriaLabel;
}

$buttonClass = Components::classnames([
	Components::selector($componentClass, $componentClass),
	Components::selector($blockClass, $blockClass, $selectorClass),
	Components::selector($additionalClass, $additionalClass),
	Components::selector($buttonIsAnchor, 'js-scroll-to-anchor'),
]);

$buttonTag = $buttonUrl ? 'a' : 'button';
?>

<?php
	echo Components::outputCssVariables($attributes, $manifest, $unique);
?>

<?php // phpcs:ignore Eightshift.Security.ComponentsEscape.OutputNotEscaped ?>
<<?php echo $buttonTag; ?>
	class="<?php echo esc_attr($buttonClass); ?>"
	<?php
	foreach ($buttonAttrs as $key => $value) {
		if (!empty($key) && !empty($value)) {
			echo wp_kses_post("{$key}=\"$value\"");
		}
	}
	?>
>
	<?php
	echo Components::render('icon', Components::props('icon', $attributes, [
		'blockClass' => $componentClass,
	]));
	?>

	<?php if (!empty($buttonContent)) { ?>
		<span><?php echo esc_html($buttonContent); ?></span>
	<?php } ?>
<?php // phpcs:ignore Eightshift.Security.ComponentsEscape.OutputNotEscaped ?>
</<?php echo $buttonTag; ?>>
