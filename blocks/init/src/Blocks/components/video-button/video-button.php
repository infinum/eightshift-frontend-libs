<?php

/**
 * Template for the Video Button Component.
 *
 * @package EightshiftBoilerplate.
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$use = $attributes['use'] ?? true;

if (!$use) {
	return;
}

$componentClass = $attributes['componentClass'] ?? 'video-button';
$blockClass = $attributes['blockClass'] ?? '';

$modalId = $attributes['modalId'] ?? '';
$label = $attributes['label'] ?? esc_html__('Play Video', 'EightshiftBoilerplate');
$icon = $attributes['icon'] ?? "<svg class='{$componentClass}__icon' width='106' height='106' xmlns='http://www.w3.org/2000/svg'><g stroke='#FFF' stroke-width='2' fill='none' fill-rule='evenodd'><circle cx='53' cy='53' r='52' /><path d='M78.764 53L40 72.382V33.618L78.764 53z' /></g></svg>";

$videoButtonClass = Components::classnames([
	$componentClass,
	$blockClass ? "{$blockClass}__{$componentClass}" : '',
]);

?>

<button
	class="<?php echo \esc_attr($videoButtonClass); ?>"
	role="button"
	tabindex="0"
	data-micromodal-trigger="<?php echo \esc_attr($modalId); ?>"
	aria-label="<?php echo \esc_html($label); ?>"
>
	<?php echo \wp_kses_post($icon); ?>
</button>
