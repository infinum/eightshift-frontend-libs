<?php

/**
 * Template for the Social networks block.
 *
 * @package %g_namespace%
 */

use %g_namespace_vendor_prefix%\EightshiftLibs\Helpers\Components;

$blockClass = $attributes['blockClass'] ?? '';
?>

<div class="<?php echo esc_attr($blockClass); ?>">
	<?php
		echo Components::render('social-networks', Components::props('socialNetworks', $attributes));
	?>
</div>
