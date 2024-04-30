<?php

/**
 * Template for the Carousel item Block view.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

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
	echo Components::outputCssVariables($attributes, $manifest, $unique),
	Components::render('image', Components::props('image', $attributes));
	?>
</div>
