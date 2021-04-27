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
	echo Components::render( // phpcs:ignore Eightshift.Security.CustomEscapeOutput.OutputNotEscaped
		'image',
		array_merge(
			Blocks::props($attributes, 'image'),
			[
				'blockClass' => $componentClass,
			]
		)
	);

	echo Components::render( // phpcs:ignore Eightshift.Security.CustomEscapeOutput.OutputNotEscaped
		'heading',
		array_merge(
			Blocks::props($attributes, 'heading', 'intro'),
			[
				'selectorClass' => 'intro',
				'blockClass' => $componentClass
			]
		)
	);

	echo Components::render( // phpcs:ignore Eightshift.Security.CustomEscapeOutput.OutputNotEscaped
		'heading',
		array_merge(
			Blocks::props($attributes, 'heading'),
			[
				'blockClass' => $componentClass
			]
		)
	);

	echo Components::render( // phpcs:ignore Eightshift.Security.CustomEscapeOutput.OutputNotEscaped
		'paragraph',
		array_merge(
			Blocks::props($attributes, 'paragraph'),
			[
				'blockClass' => $componentClass
			]
		)
	);

	echo Components::render( // phpcs:ignore Eightshift.Security.CustomEscapeOutput.OutputNotEscaped
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
