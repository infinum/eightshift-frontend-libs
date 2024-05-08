<?php

/**
 * Template for the Jumbotron Component.
 *
 * @package %g_namespace%
 */

use %g_namespace_vendor_prefix%\EightshiftLibs\Helpers\Components;

$manifest = Components::getManifestByDir(__DIR__);

$jumbotronUse = Components::checkAttr('jumbotronUse', $attributes, $manifest);
if (!$jumbotronUse) {
	return;
}

$componentClass = $manifest['componentClass'] ?? '';
$additionalClass = $attributes['additionalClass'] ?? '';
$blockClass = $attributes['blockClass'] ?? '';
$selectorClass = $attributes['selectorClass'] ?? $componentClass;

$unique = Components::getUnique();

$jumbotronClass = Components::classnames([
	Components::selector($componentClass, $componentClass),
	Components::selector($blockClass, $blockClass, $selectorClass),
	Components::selector($additionalClass, $additionalClass),
]);

$jumbotronContentClass = Components::selector($componentClass, $componentClass, 'content');
$jumbotronContentWrapClass = Components::selector($componentClass, $componentClass, 'content-wrap');
?>

<div class="<?php echo esc_attr($jumbotronClass); ?>" data-id="<?php echo esc_attr($unique); ?>" role="region">
	<?php
	echo Components::outputCssVariables($attributes, $manifest, $unique);

	echo Components::render('image', Components::props('image', $attributes, [
		'blockClass' => $componentClass,
		'imageFull' => true,
	]));
	?>

	<div class="<?php echo esc_attr($jumbotronContentClass); ?>">
		<div class="<?php echo esc_attr($jumbotronContentWrapClass); ?>">
			<?php
			echo Components::render('heading', Components::props('heading', $attributes, [
				'blockClass' => $componentClass
			])),

			Components::render('paragraph', Components::props('paragraph', $attributes, [
				'blockClass' => $componentClass
			])),

			Components::render('button', Components::props('button', $attributes, [
				'blockClass' => $componentClass
			]));
			?>
		</div>
	</div>
</div>
