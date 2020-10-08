<?php
/**
 * Template for the Video Button Component.
 *
 * @package EightshiftBoilerplate.
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$componentClass = $attributes['componentClass'] ?? 'video-button';
$blockClass = $attributes['blockClass'] ?? '';
$modalId = $attributes['modalId'] ?? '';;
$icon = $attributes['icon'] ?? "<svg class='{$componentClass}__icon' width='106' height='106' xmlns='http://www.w3.org/2000/svg'><g stroke='#FFF' stroke-width='2' fill='none' fill-rule='evenodd'><circle cx='53' cy='53' r='52' /><path d='M78.764 53L40 72.382V33.618L78.764 53z' /></g></svg>";

$classes = Components::classnames([
	$componentClass,
	$blockClass ? "{$blockClass}__{$componentClass}" : '',
]);

if (!$modalId) {
	return;
}
?>

<button
		class="<?php echo \esc_attr( "{$classes}" ); ?>"
		role="button"
		tabindex="0"
		data-micromodal-trigger="<?php echo \esc_attr($modalId); ?>"
		aria-label="<?php echo \esc_html__( 'Play Video', 'eightshift-boilerplate' ); ?>"
	>
	<?php echo \wp_kses_post($icon); ?>
	</button>
