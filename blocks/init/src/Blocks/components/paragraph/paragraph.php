<?php

/**
 * Template for the Paragraph Component.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$paragraph = $attributes['paragraph'] ?? [];

if (! $paragraph) {
	return;
}

$content = $paragraph['content'] ?? '';

if (! $content) {
	return;
}

$componentClass = 'paragraph';
$blockClass     = $attributes['blockClass'] ?? '';
$styleAlign     = isset($paragraph['styleAlign']) ? "{$componentClass}__align--{$paragraph['styleAlign']}" : '';
$styleColor     = isset($paragraph['styleColor']) ? "{$componentClass}__color--{$paragraph['styleColor']}" : '';
$styleSize      = isset($paragraph['styleSize']) ? "{$componentClass}__size--{$paragraph['styleSize']}" : '';

$paragraphClass = Components::classnames(
	[
	$componentClass,
	$styleColor,
	$styleAlign,
	$styleSize,
	"{$blockClass}__paragraph"
	]
);

?>

<p class="<?php echo esc_attr($paragraphClass); ?>">
  <?php echo wp_kses_post($content); ?>
</p>
