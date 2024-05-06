<?php

/**
 * Template for the Map Block view.
 *
 * @package EightshiftBoilerplate
 */

 use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$manifest = Components::getManifestByDir(__DIR__);

$blockClass = $attributes['blockClass'] ?? '';
$blockJsClass = $attributes['blockJsClass'] ?? '';

$mapClasses = Components::classnames([
	$blockClass,
	$blockJsClass,
]);

$mapLayers = Components::checkAttr('mapLayers', $attributes, $manifest);
$mapCenterLat = Components::checkAttr('mapCenterLat', $attributes, $manifest);
$mapCenterLon = Components::checkAttr('mapCenterLon', $attributes, $manifest);
$mapZoom = Components::checkAttr('mapZoom', $attributes, $manifest);
$mapInteractions = Components::checkAttr('mapInteractions', $attributes, $manifest);
$mapControls = Components::checkAttr('mapControls', $attributes, $manifest);

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
