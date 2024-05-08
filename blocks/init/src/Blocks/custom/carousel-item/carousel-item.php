<?php

/**
 * Template for the Carousel item Block view.
 *
 * @package %g_namespace%
 */

use %g_namespace_vendor_prefix%\EightshiftLibs\Helpers\Helpers;

$manifest = Helpers::getManifestByDir(__DIR__);

$blockClass = $attributes['blockClass'] ?? '';
$blockJsClass = $attributes['blockJsClass'] ?? '';

$unique = Helpers::getUnique();

$carouselItemClass = Helpers::classnames([
	$blockClass,
	$blockJsClass,
]);
?>

<div class="<?php echo esc_attr($carouselItemClass); ?>" data-id="<?php echo esc_attr($unique); ?>">
	<?php
	echo Helpers::outputCssVariables($attributes, $manifest, $unique),
	Helpers::render('image', Helpers::props('image', $attributes));
	?>
</div>
