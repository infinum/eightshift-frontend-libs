<?php

/**
 * Load More component
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplate\Config\Config;
use EightshiftBoilerplate\Rest\Routes\LoadMoreRoute;
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

// Bailout if no query is not provided.
if (!$loadMoreQuery) {
	return;
}

$loadMoreRoute = \rest_url() . Config::getProjectRoutesNamespace() . '/' . Config::getProjectRoutesVersion() . '/' . LoadMoreRoute::ROUTE_NAME;

parse_str($loadMoreQuery, $loadMoreQueryArray);

if (!isset($loadMoreQueryArray['page'])) {
	$loadMoreQueryArray['page'] = 2;
}

if (!empty($loadMoreQueryArray['exclude'])) {
	$loadMoreQueryArray['page'] = 1;
}

$loadMoreQueryArray = http_build_query($loadMoreQueryArray);

?>

<div class="<?php echo \esc_attr($componentClass); ?>">
	<?php
	// echo \wp_kses_post(Components::render('loader', array_merge(
	// 	$attributes,
	// 	[
	// 		'blockClass' => $componentClass,
	// 		'loaderCustomSelector' => "{$componentJsClass}-loader",
	// 	]
	// )));
	echo Components::render(
		'button',
		Components::props('button', $attributes, [
			'blockClass' => $componentClass,
			'additionalClass' => $componentJsClass,
			// 'buttonContent' => $loadMoreContent,
			'buttonAttrs' => [
				'data-load-more-id' => $loadMoreId,
				'data-load-more-route' => "{$loadMoreRoute}?{$loadMoreQueryArray}"
			]
		]),
		'',
		true
	);
	?>
</div>

