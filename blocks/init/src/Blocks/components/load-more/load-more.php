<?php

/**
 * Load More component
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$manifest = Components::getManifest(__DIR__);
$componentName = $attributes['componentName'] ?? $manifest['componentName'];

$loadMoreUse = Components::checkAttr('loadMoreUse', $attributes, $manifest, $componentName);
if (!$loadMoreUse) {
	return;
}

$componentClass = $manifest['componentClass'] ?? '';
$componentJsClass = $manifest['componentJsClass'] ?? '';
$additionalClass = $attributes['additionalClass'] ?? '';
$blockClass = $attributes['blockClass'] ?? '';
$selectorClass = $attributes['selectorClass'] ?? $componentClass;

$loadMoreQuery = Components::checkAttr('loadMoreQuery', $attributes, $manifest, $componentName);
$loadMoreId = Components::checkAttr('loadMoreId', $attributes, $manifest, $componentName);
$loadMoreType = Components::checkAttr('loadMoreType', $attributes, $manifest, $componentName);
$loadMoreCount = Components::checkAttr('loadMoreCount', $attributes, $manifest, $componentName);

// Bailout if no query is not provided.
if (!$loadMoreQuery) {
	return;
}

$loadMoreClass = Components::classnames([
	Components::selector($componentClass, $componentClass),
	Components::selector($blockClass, $blockClass, $selectorClass),
	Components::selector($additionalClass, $additionalClass),
]);

?>

<div class="<?php echo \esc_attr($loadMoreClass); ?>">
	<?php
	echo Components::render(
		'button',
		Components::props('button', $attributes, [
			'blockClass' => $componentClass,
			'additionalClass' => $componentJsClass,
			'buttonAttrs' => [
				'data-load-more-count' => $loadMoreCount,
				'data-load-more-type' => $loadMoreType,
				'data-load-more-id' => $loadMoreId,
				'data-load-more-query' => $loadMoreQuery
			]
		]),
		'',
		true
	);
	?>
</div>

