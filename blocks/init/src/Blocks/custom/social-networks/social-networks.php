<?php

/**
 * Template for the Social networks block.
 *
 * @package %g_namespace%
 */

use %g_namespace_vendor_prefix%\EightshiftLibs\Helpers\Helpers;

$blockClass = $attributes['blockClass'] ?? '';
?>

<div class="<?php echo esc_attr($blockClass); ?>">
	<?php
		echo Helpers::render('social-networks', Helpers::props('socialNetworks', $attributes));
	?>
</div>
