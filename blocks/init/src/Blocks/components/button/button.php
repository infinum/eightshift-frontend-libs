<?php

/**
 * Template for the Button Component.
 *
 * @package %g_namespace%
 */

use %g_namespace_vendor_prefix%\EightshiftLibs\Helpers\Helpers;

$manifest = Helpers::getManifestByDir(__DIR__);

$buttonUse = Helpers::checkAttr('buttonUse', $attributes, $manifest);
if (!$buttonUse) {
	return;
}

$unique = Helpers::getUnique();

$componentClass = $manifest['componentClass'] ?? '';
$additionalClass = $attributes['additionalClass'] ?? '';
$blockClass = $attributes['blockClass'] ?? '';
$selectorClass = $attributes['selectorClass'] ?? $componentClass;

$buttonUrl = Helpers::checkAttr('buttonUrl', $attributes, $manifest);
$buttonContent = Helpers::checkAttr('buttonContent', $attributes, $manifest);
$buttonIsAnchor = Helpers::checkAttr('buttonIsAnchor', $attributes, $manifest);
$buttonId = Helpers::checkAttr('buttonId', $attributes, $manifest);
$buttonIsNewTab = Helpers::checkAttr('buttonIsNewTab', $attributes, $manifest);
$buttonAriaLabel = Helpers::checkAttr('buttonAriaLabel', $attributes, $manifest);
$buttonAttrs = (array)Helpers::checkAttr('buttonAttrs', $attributes, $manifest);

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

$buttonClass = Helpers::classnames([
	Helpers::selector($componentClass, $componentClass),
	Helpers::selector($blockClass, $blockClass, $selectorClass),
	Helpers::selector($additionalClass, $additionalClass),
	Helpers::selector($buttonIsAnchor, 'js-scroll-to-anchor'),
]);

$buttonTag = $buttonUrl ? 'a' : 'button';
?>

<?php
	echo Helpers::outputCssVariables($attributes, $manifest, $unique);
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
	echo Helpers::render('icon', Helpers::props('icon', $attributes, [
		'blockClass' => $componentClass,
	]));
	?>

	<?php if (!empty($buttonContent)) { ?>
		<span><?php echo esc_html($buttonContent); ?></span>
	<?php } ?>
<?php // phpcs:ignore Eightshift.Security.ComponentsEscape.OutputNotEscaped ?>
</<?php echo $buttonTag; ?>>
