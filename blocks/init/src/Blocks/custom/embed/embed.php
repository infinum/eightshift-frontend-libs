<?php

/**
 * Template for the Embed Block view.
 *
 * @package SaferInternet
 */

 use %g_namespace_vendor_prefix%\EightshiftLibs\Helpers\Helpers;

$globalManifest = Helpers::getManifest(dirname(__DIR__, 2));
$manifest = Helpers::getManifest(__DIR__);

$blockClass = $attributes['blockClass'] ?? '';

$unique = Helpers::getUnique();

?>

<div class="<?php echo esc_attr($blockClass); ?>" data-id="<?php echo esc_attr($unique); ?>">
	<?php
	echo Helpers::outputCssVariables($attributes, $manifest, $unique, $globalManifest);

	echo Helpers::render(
		'embed',
		Helpers::props('embed', $attributes)
	);
	?>
</div>
