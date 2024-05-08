<?php

/**
 * Template for the Map Block view.
 *
 * @package %g_namespace%
 */

 use %g_namespace_vendor_prefix%\EightshiftLibs\Helpers\Helpers;

$manifest = Helpers::getManifestByDir(__DIR__);

$blockClass = $attributes['blockClass'] ?? '';
$blockJsClass = $attributes['blockJsClass'] ?? '';

$mapClasses = Helpers::classnames([
	$blockClass,
	$blockJsClass,
]);

$mapLayers = Helpers::checkAttr('mapLayers', $attributes, $manifest);
$mapCenterLat = Helpers::checkAttr('mapCenterLat', $attributes, $manifest);
$mapCenterLon = Helpers::checkAttr('mapCenterLon', $attributes, $manifest);
$mapZoom = Helpers::checkAttr('mapZoom', $attributes, $manifest);
$mapInteractions = Helpers::checkAttr('mapInteractions', $attributes, $manifest);
$mapControls = Helpers::checkAttr('mapControls', $attributes, $manifest);

// Take only active map layers and clean them up a bit so the output JSON is smaller.
$activeLayers = array_filter($mapLayers, fn ($layer) => $layer['hidden'] === false); // @phpstan-ignore-line

$activeLayers = array_map(function ($layer) {
	unset($layer['id']);
	unset($layer['hidden']);

	return $layer;
}, $activeLayers);

// Reverse array so the last element is on top, to match editor.
$activeLayers = array_reverse($activeLayers);

// Reset the keys.
$activeLayers = array_values($activeLayers);
?>

<div
	class="<?php echo esc_attr($mapClasses); ?>"
	data-center-lat="<?php echo esc_attr($mapCenterLat); ?>"
	data-center-lon="<?php echo esc_attr($mapCenterLon); ?>"
	data-center-zoom="<?php echo esc_attr($mapZoom); ?>"
	data-map-interactions="<?php echo esc_attr(wp_json_encode($mapInteractions)); ?>"
	data-map-controls="<?php echo esc_attr(wp_json_encode($mapControls)); ?>"
	data-map-layers="<?php echo esc_attr(wp_json_encode($activeLayers)); ?>"
>
</div>
