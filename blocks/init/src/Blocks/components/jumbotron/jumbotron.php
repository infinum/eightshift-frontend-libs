<?php

/**
 * Template for the Jumbotron Component.
 *
 * @package %g_namespace%
 */

use %g_namespace_vendor_prefix%\EightshiftLibs\Helpers\Helpers;

$manifest = Helpers::getManifestByDir(__DIR__);

$jumbotronUse = Helpers::checkAttr('jumbotronUse', $attributes, $manifest);
if (!$jumbotronUse) {
	return;
}

$componentClass = $manifest['componentClass'] ?? '';
$additionalClass = $attributes['additionalClass'] ?? '';
$blockClass = $attributes['blockClass'] ?? '';
$selectorClass = $attributes['selectorClass'] ?? $componentClass;

$unique = Helpers::getUnique();

$jumbotronClass = Helpers::classnames([
	Helpers::selector($componentClass, $componentClass),
	Helpers::selector($blockClass, $blockClass, $selectorClass),
	Helpers::selector($additionalClass, $additionalClass),
]);

$jumbotronContentClass = Helpers::selector($componentClass, $componentClass, 'content');
$jumbotronContentWrapClass = Helpers::selector($componentClass, $componentClass, 'content-wrap');
?>

<div class="<?php echo esc_attr($jumbotronClass); ?>" data-id="<?php echo esc_attr($unique); ?>" role="region">
	<?php
	echo Helpers::outputCssVariables($attributes, $manifest, $unique);

	echo Helpers::render('image', Helpers::props('image', $attributes, [
		'blockClass' => $componentClass,
		'imageFull' => true,
	]));
	?>

	<div class="<?php echo esc_attr($jumbotronContentClass); ?>">
		<div class="<?php echo esc_attr($jumbotronContentWrapClass); ?>">
			<?php
			echo Helpers::render('heading', Helpers::props('heading', $attributes, [
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
	</div>
</div>
