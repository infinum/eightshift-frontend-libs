<?php

/**
 * Template for the Carousel item Block view.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$globalManifest = Components::getManifest(dirname(__DIR__, 2));
$manifest = Components::getManifest(__DIR__);

$blockClass = $attributes['blockClass'] ?? '';
$blockJsClass = $attributes['blockJsClass'] ?? '';

$unique = Components::getUnique();

$carouselItemClass = Components::classnames([
	$blockClass,
	$blockJsClass,
]);
?>

<div class="<?php echo esc_attr($carouselItemClass); ?>" data-id="<?php echo esc_attr($unique); ?>">
	<?php
	echo Components::outputCssVariables($attributes, $manifest, $unique, $globalManifest);

	// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
	echo Components::render('image', Components::props('image', $attributes));
	?>
</div>
