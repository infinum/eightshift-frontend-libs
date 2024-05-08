<?php

/**
 * Load more button component.
 *
 * @package %g_namespace%
 */

use %g_namespace_vendor_prefix%\EightshiftLibs\Helpers\Helpers;

$manifest = Helpers::getManifestByDir(__DIR__);
$componentName = $attributes['componentName'] ?? $manifest['componentName'];

$loadMoreUse = Helpers::checkAttr('loadMoreUse', $attributes, $manifest, $componentName);
if (!$loadMoreUse) {
	return;
}

$componentClass = $manifest['componentClass'] ?? '';
$componentJsClass = $manifest['componentJsClass'] ?? '';
$additionalClass = $attributes['additionalClass'] ?? '';
$blockClass = $attributes['blockClass'] ?? '';
$selectorClass = $attributes['selectorClass'] ?? $componentClass;

$loadMoreInitiaItems = Helpers::checkAttr('loadMoreInitiaItems', $attributes, $manifest, $componentName);
$loadMoreQuery = Helpers::checkAttr('loadMoreQuery', $attributes, $manifest, $componentName);
$loadMoreId = Helpers::checkAttr('loadMoreId', $attributes, $manifest, $componentName);
$loadMoreType = Helpers::checkAttr('loadMoreType', $attributes, $manifest, $componentName);
$loadMorePerPageOverride = Helpers::checkAttr('loadMorePerPageOverride', $attributes, $manifest, $componentName);

// Bailout if no query is provided.
if (!$loadMoreQuery) {
	return;
}

$loadMoreClass = Helpers::classnames([
	Helpers::selector($componentClass, $componentClass),
	Helpers::selector($blockClass, $blockClass, $selectorClass),
	Helpers::selector($additionalClass, $additionalClass),
]);

?>

<div class="<?php echo esc_attr($loadMoreClass); ?>">
	<?php
	echo Helpers::render('button', Helpers::props('button', $attributes, [
		'blockClass' => $componentClass,
		'additionalClass' => $componentJsClass,
		'buttonAttrs' => [
			'data-load-more-type' => $loadMoreType,
			'data-load-more-id' => $loadMoreId,
			'data-load-more-query' => $loadMoreQuery,
			'data-load-more-initial-items' => $loadMoreInitiaItems,
			'data-load-more-per-page-override' => $loadMorePerPageOverride,
		]
	]), 'components', true);
	?>
</div>
