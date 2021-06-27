<?php

/**
 * Template for the Card Component.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplate\Blocks\Blocks;
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
	echo Components::outputCssVariables($attributes, $manifest, $unique, $globalManifest); // phpcs:ignore Eightshift.Security.CustomEscapeOutput.OutputNotEscaped

	echo Components::render( // phpcs:ignore Eightshift.Security.CustomEscapeOutput.OutputNotEscaped
		'image',
		array_merge(
			Blocks::props($attributes, 'image'),
			[
				'blockClass' => $componentClass,
			]
		)
	),

	Components::render( // phpcs:ignore Eightshift.Security.CustomEscapeOutput.OutputNotEscaped
		'heading',
		array_merge(
			Blocks::props($attributes, 'heading', 'intro'),
			[
				'selectorClass' => 'intro',
				'blockClass' => $componentClass
			]
		)
	),

	Components::render( // phpcs:ignore Eightshift.Security.CustomEscapeOutput.OutputNotEscaped
		'heading',
		array_merge(
			Blocks::props($attributes, 'heading'),
			[
				'blockClass' => $componentClass
			]
		)
	),

	Components::render( // phpcs:ignore Eightshift.Security.CustomEscapeOutput.OutputNotEscaped
		'paragraph',
		array_merge(
			Blocks::props($attributes, 'paragraph'),
			[
				'blockClass' => $componentClass
			]
		)
	),

	Components::render( // phpcs:ignore Eightshift.Security.CustomEscapeOutput.OutputNotEscaped
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
