<?php

/**
 * Template for the Scroll To Top Component.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$componentClass = $attributes['componentClass'] ?? 'scroll-to-top';
$blockClass = $attributes['blockClass'] ?? '';
$content = $attributes['content'] ?? \esc_html__('To Top', 'eightshift-boilerplate');;

$scrollClass = Components::classnames([
	$componentClass,
	"js-{$componentClass}",
	$blockClass ? "{$blockClass}__{$componentClass}" : '',
]);

?>

<a href="#" class="<?php echo \esc_attr($scrollClass); ?>">
	<?php \esc_html($$content); ?>
</a>
