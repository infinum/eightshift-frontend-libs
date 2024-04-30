<?php

/**
 * Template for the Quote Component.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$manifest = Components::getManifest(__DIR__);

$quoteUse = Components::checkAttr('quoteUse', $attributes, $manifest);
if (!$quoteUse) {
	return;
}

$componentClass = $manifest['componentClass'] ?? '';
$additionalClass = $attributes['additionalClass'] ?? '';
$blockClass = $attributes['blockClass'] ?? '';
$selectorClass = $attributes['selectorClass'] ?? $componentClass;

$quoteClass = Components::classnames([
	Components::selector($componentClass, $componentClass),
	Components::selector($blockClass, $blockClass, $selectorClass),
	Components::selector($additionalClass, $additionalClass),
]);

$quoteContentClass = Components::selector($componentClass, $componentClass, 'content');
$quoteSeparatorClass = Components::selector($componentClass, $componentClass, 'separator');
$quoteCaptionClass = Components::selector($componentClass, $componentClass, 'caption');

$quoteAuthorUse = Components::checkAttr('quoteAuthorUse', $attributes, $manifest);
?>

<figure class="<?php echo esc_attr($quoteClass); ?>">
	<?php
	echo Components::render('icon', Components::props('icon', $attributes, [
		'blockClass' => $componentClass
	]));
	?>

	<blockquote class="<?php echo esc_attr($quoteContentClass); ?>">
		<?php
		echo Components::render('paragraph', Components::props('paragraph', $attributes, [
			'blockClass' => $componentClass
		]));
		?>
	</blockquote>

	<?php if ($quoteAuthorUse) { ?>
		<div class="<?php echo esc_attr($quoteSeparatorClass); ?>"></div>

		<figcaption class="<?php echo esc_attr($quoteCaptionClass); ?>">
			<?php
			echo Components::render('paragraph', Components::props('author', $attributes, [
				'blockClass' => $componentClass
			]));
			?>
		</figcaption>
	<?php } ?>
</figure>
