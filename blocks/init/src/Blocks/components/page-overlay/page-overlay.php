<?php

/**
 * Template for the Page Overlay Component.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$componentClass = $attributes['componentClass'] ?? 'page-overlay';
$blockClass = $attributes['blockClass'] ?? '';

$overlayClass = Components::classnames([
	$componentClass,
	"js-{$blockClass}",
	$blockClass ? "{$blockClass}__{$componentClass}" : '',
]);

?>

<div class="<?php echo esc_attr($overlayClass); ?>"></div>
