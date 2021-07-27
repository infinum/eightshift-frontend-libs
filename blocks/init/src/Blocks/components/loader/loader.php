<?php

/**
 * Template for the Loader Component view.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$manifest = Components::getManifest(__DIR__);

$loaderUse = Components::checkAttr('loaderUse', $attributes, $manifest);
if (!$loaderUse) {
	return;
}

$componentClass = $manifest['componentClass'] ?? '';
$additionalClass = $attributes['additionalClass'] ?? '';
$blockClass = $attributes['blockClass'] ?? '';
$selectorClass = $attributes['selectorClass'] ?? $componentClass;

$loaderUseOverlay = Components::checkAttr('loaderUseOverlay', $attributes, $manifest);

$loaderClass = Components::classnames([
	Components::selector($componentClass, $componentClass),
	Components::selector($blockClass, $blockClass, $selectorClass),
	Components::selector($additionalClass, $additionalClass),
	Components::selector($loaderUseOverlay, $componentClass, '', 'use-overlay'), // @phpstan-ignore-line
]);
?>

<div class="<?php echo esc_attr($loaderClass); ?>">
	<svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44" >
		<g fill="none" fill-rule="evenodd" stroke-width="2">
			<circle cx="22" cy="22" r="1" stroke="var(--loader-color-1, currentColor)">
				<animate attributeName="r" begin="0s" dur="1.8s" values="1; 20" calcMode="spline" keyTimes="0; 1" keySplines="0.165, 0.84, 0.44, 1" repeatCount="indefinite"/>
				<animate attributeName="stroke-opacity" begin="0s" dur="1.8s" values="1; 0" calcMode="spline" keyTimes="0; 1" keySplines="0.3, 0.61, 0.355, 1" repeatCount="indefinite"/>
			</circle>
			<circle cx="22" cy="22" r="1" stroke="var(--loader-color-2, currentColor)">
				<animate attributeName="r" begin="-0.9s" dur="1.8s" values="1; 20" calcMode="spline" keyTimes="0; 1" keySplines="0.165, 0.84, 0.44, 1" repeatCount="indefinite"/>
				<animate attributeName="stroke-opacity" begin="-0.9s" dur="1.8s" values="1; 0" calcMode="spline" keyTimes="0; 1" keySplines="0.3, 0.61, 0.355, 1" repeatCount="indefinite"/>
			</circle>
		</g>
	</svg>
</div>
