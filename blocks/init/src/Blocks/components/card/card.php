<?php

/**
 * Template for the Card Component.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$globalManifest = Components::getManifest(dirname(__DIR__, 2));
$manifest = Components::getManifest(__DIR__);

$componentClass = $attributes['componentClass'] ?? $manifest['componentClass'];
$selectorClass = $attributes['selectorClass'] ?? $componentClass;
$blockClass = $attributes['blockClass'] ?? '';

$unique = Components::getUnique();

$cardClass = Components::classnames([
	$componentClass,
	Components::selector($blockClass, $blockClass, $selectorClass),
]);

?>

<div class="<?php echo \esc_attr($cardClass); ?>" data-id="<?php echo \esc_attr($unique); ?>">
	<?php
	echo Components::outputCssVariables($attributes, $manifest, $unique, $globalManifest); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped

	echo Components::render( // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		'image',
		array_merge(
			Components::prop('image', $attributes),
			[
				'blockClass' => $componentClass,
			]
		)
	),

	Components::render( // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		'heading',
		array_merge(
			Components::prop('intro', $attributes),
			[
				'selectorClass' => 'intro',
				'blockClass' => $componentClass
			]
		)
	),

	Components::render( // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		'heading',
		array_merge(
			Components::prop('heading', $attributes),
			[
				'blockClass' => $componentClass
			]
		)
	),

	Components::render( // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		'paragraph',
		array_merge(
			Components::prop('paragraph', $attributes),
			[
				'blockClass' => $componentClass
			]
		)
	),

	Components::render( // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		'button',
		array_merge(
			Components::prop('button', $attributes),
			[
				'blockClass' => $componentClass
			]
		)
	);
	?>
</div>
