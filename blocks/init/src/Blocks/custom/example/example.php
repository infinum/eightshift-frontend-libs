<?php

/**
 * Template for the Example Block view.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$manifest = Components::getManifest(__DIR__);

$blockClass = $attributes['blockClass'] ?? '';

$content = Components::checkAttr('content', $attributes, $manifest);

?>

<div class="<?php echo \esc_attr($blockClass); ?>">
	<?php echo \wp_kses_post($content); ?>
</div>
