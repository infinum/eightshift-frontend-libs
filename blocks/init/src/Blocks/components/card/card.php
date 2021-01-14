<?php

/**
 * Template for the Card Component.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$manifest = Components::getManifest(__DIR__);

$componentClass = $attributes['componentClass'] ?? $manifest['componentClass'];
$selectorClass = $attributes['selectorClass'] ?? $componentClass;
$blockClass = $attributes['blockClass'] ?? '';

$cardClass = Components::classnames([
	$componentClass,
	Components::selector($blockClass, $blockClass, $selectorClass),
]);

?>

<div class="<?php echo \esc_attr($cardClass); ?>">
	<?php
	echo \wp_kses_post(Components::render('image', array_merge(
		$attributes,
		[
			'blockClass' => $componentClass
		]
	)));
	echo \wp_kses_post(Components::render('heading', array_merge(
		$attributes,
		[
			'componentName' => 'intro',
			'headingUse' => $attributes['introUse'],
			'headingContent' => $attributes['introContent'] ?? '',
			'headingLevel' => $attributes['introLevel'],
			'headingColor' => $attributes['introColor'],
			'headingSize' => $attributes['introSize'],
			'headingAlign' => $attributes['introAlign'],
			'selectorClass' => 'intro',
			'blockClass' => $componentClass
		]
	)));
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
