<?php

/**
 * Template for the Jumbotron Component.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$globalManifest = Components::getManifest(dirname(__DIR__, 2));
$manifest = Components::getManifest(__DIR__);

$jumbotronUse = Components::checkAttr('jumbotronUse', $attributes, $manifest);
if (!$jumbotronUse) {
	return;
}

$componentClass = $attributes['componentClass'] ?? $manifest['componentClass'];
$selectorClass = $attributes['selectorClass'] ?? $componentClass;
$blockClass = $attributes['blockClass'] ?? '';

$unique = Components::getUnique();
echo Components::outputCssVariables($attributes, $manifest, $unique, $globalManifest); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped

$jumbotronClass = Components::classnames([
	$componentClass,
	Components::selector($blockClass, $blockClass, $selectorClass),
]);

?>

<div class="<?php echo \esc_attr($jumbotronClass); ?>" data-id="<?php echo esc_attr($unique); ?>">
	<?php
	echo Components::render( // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		'image',
		array_merge(
			Components::prop('image', $attributes),
			[
				'blockClass' => $componentClass,
				'imageUsePlaceholder' => true,
				'imageBg' => true,
			]
		)
	);
	?>

	<div class="<?php echo \esc_attr("{$componentClass}__content"); ?>">
		<div class="<?php echo \esc_attr("{$componentClass}__content-wrap"); ?>">
			<?php
			echo Components::render( // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
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
	</div>
</div>
