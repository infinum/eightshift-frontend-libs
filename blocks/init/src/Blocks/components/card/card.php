<?php

/**
 * Template for the Card Component.
 *
 * @package %g_namespace%
 */

use %g_namespace_vendor_prefix%\EightshiftLibs\Helpers\Helpers;

$manifest = Helpers::getManifestByDir(__DIR__);

$componentClass = $manifest['componentClass'] ?? '';
$additionalClass = $attributes['additionalClass'] ?? '';
$blockClass = $attributes['blockClass'] ?? '';
$selectorClass = $attributes['selectorClass'] ?? $componentClass;

$unique = Helpers::getUnique();

$cardClass = Helpers::classnames([
	Helpers::selector($componentClass, $componentClass),
	Helpers::selector($blockClass, $blockClass, $selectorClass),
	Helpers::selector($additionalClass, $additionalClass),
]);
?>

<div class="<?php echo esc_attr($cardClass); ?>" data-id="<?php echo esc_attr($unique); ?>">
	<?php
	echo Helpers::outputCssVariables($attributes, $manifest, $unique),

	Helpers::render('image', Helpers::props('image', $attributes, [
		'blockClass' => $componentClass,
	])),

	Helpers::render('heading', Helpers::props('intro', $attributes, [
		'selectorClass' => 'intro',
		'blockClass' => $componentClass
	])),

	Helpers::render('heading', Helpers::props('heading', $attributes, [
		'blockClass' => $componentClass
	])),

	Helpers::render('paragraph', Helpers::props('paragraph', $attributes, [
		'blockClass' => $componentClass
	])),

	Helpers::render('button', Helpers::props('button', $attributes, [
		'blockClass' => $componentClass
	]));
	?>
</div>
