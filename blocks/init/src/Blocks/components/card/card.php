<?php

/**
 * Template for the Card Component.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplate\Blocks\Blocks;
use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$manifest = Components::getManifest(__DIR__);

$componentClass = $attributes['componentClass'] ?? $manifest['componentClass'];
$selectorClass = $attributes['selectorClass'] ?? $componentClass;
$blockClass = $attributes['blockClass'] ?? '';

$cardClass = Components::classnames([
	$componentClass,
	Components::selector($blockClass, $blockClass, $selectorClass),
]);

?>

<div class="<?php echo \esc_attr($cardClass); ?>">
	<?php
	echo Components::render( // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		'image',
		array_merge(
			Blocks::props($attributes, 'image'),
			[
				'blockClass' => $componentClass,
			]
		)
	),

	Components::render( // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		'heading',
		array_merge(
			Blocks::props($attributes, 'heading', 'intro'),
			[
				'selectorClass' => 'intro',
				'blockClass' => $componentClass
			]
		)
	),

	Components::render( // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		'heading',
		array_merge(
			Blocks::props($attributes, 'heading'),
			[
				'blockClass' => $componentClass
			]
		)
	),

	Components::render( // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		'paragraph',
		array_merge(
			Blocks::props($attributes, 'paragraph'),
			[
				'blockClass' => $componentClass
			]
		)
	),

	Components::render( // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		'button',
		array_merge(
			Blocks::props($attributes, 'button'),
			[
				'blockClass' => $componentClass
			]
		)
	);
	?>
</div>
