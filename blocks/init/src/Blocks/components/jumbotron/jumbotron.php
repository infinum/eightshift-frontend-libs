<?php

/**
 * Template for the Jumbotron Component.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$manifest = Components::getManifest(__DIR__);
$componentName = $attributes['componentName'] ?? $manifest['componentName'];

$jumbotronUse = Components::checkAttr('jumbotronUse', $attributes, $manifest, $componentName);
if (!$jumbotronUse) {
	return;
}

$componentClass = $attributes['componentClass'] ?? $manifest['componentClass'];
$selectorClass = $attributes['selectorClass'] ?? $componentClass;
$blockClass = $attributes['blockClass'] ?? '';

$jumbotronContentPosition = Components::checkAttr('jumbotronContentPosition', $attributes, $manifest, $componentName);

$jumbotronClass = Components::classnames([
	$componentClass,
	Components::selector($blockClass, $blockClass, $selectorClass),
]);

$contentClass = Components::classnames([
	Components::selector($componentClass, $componentClass, 'content'),
]);

$contentWrapClass = Components::classnames([
	Components::selector($componentClass, $componentClass, 'content-wrap'),
]);

?>

<div class="<?php echo \esc_attr($jumbotronClass); ?>">
	<?php
	echo \wp_kses_post(Components::render('image', array_merge(
		$attributes,
		[
			'blockClass' => $componentClass,
			'imageUsePlaceholder' => true,
			'imageBg' => true,
		]
	)));
	?>

	<div class="<?php echo \esc_attr($contentClass); ?>" data-position="<?php echo \esc_attr($jumbotronContentPosition); ?>">
		<div class="<?php echo \esc_attr($contentWrapClass); ?>">
			<?php
			echo \wp_kses_post(Components::render('heading', array_merge(
				$attributes,
				[
					'blockClass' => $componentClass
				]
			)));
			echo \wp_kses_post(Components::render('paragraph', array_merge(
				$attributes,
				[
					'blockClass' => $componentClass
				]
			)));
			echo \wp_kses_post(Components::render('button', array_merge(
				$attributes,
				[
					'blockClass' => $componentClass
				]
			)));
			?>
		</div>
	</div>

</div>
