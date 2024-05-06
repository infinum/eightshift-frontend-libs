<?php

/**
 * Template for the Quote Component.
 *
 * @package %g_namespace%
 */

use %g_namespace_vendor_prefix%\EightshiftLibs\Helpers\Helpers;

$manifest = Helpers::getManifestByDir(__DIR__);

$quoteUse = Helpers::checkAttr('quoteUse', $attributes, $manifest);
if (!$quoteUse) {
	return;
}

$componentClass = $manifest['componentClass'] ?? '';
$additionalClass = $attributes['additionalClass'] ?? '';
$blockClass = $attributes['blockClass'] ?? '';
$selectorClass = $attributes['selectorClass'] ?? $componentClass;

$quoteClass = Helpers::classnames([
	Helpers::selector($componentClass, $componentClass),
	Helpers::selector($blockClass, $blockClass, $selectorClass),
	Helpers::selector($additionalClass, $additionalClass),
]);

$quoteContentClass = Helpers::selector($componentClass, $componentClass, 'content');
$quoteSeparatorClass = Helpers::selector($componentClass, $componentClass, 'separator');
$quoteCaptionClass = Helpers::selector($componentClass, $componentClass, 'caption');

$quoteAuthorUse = Helpers::checkAttr('quoteAuthorUse', $attributes, $manifest);
?>

<figure class="<?php echo esc_attr($quoteClass); ?>" role="presentation">
	<?php
	echo Helpers::render('icon', Helpers::props('icon', $attributes, [
		'blockClass' => $componentClass
	]));
	?>

	<blockquote class="<?php echo esc_attr($quoteContentClass); ?>">
		<?php
		echo Helpers::render('paragraph', Helpers::props('paragraph', $attributes, [
			'blockClass' => $componentClass
		]));
		?>
	</blockquote>

	<?php if ($quoteAuthorUse) { ?>
		<div class="<?php echo esc_attr($quoteSeparatorClass); ?>"></div>

		<figcaption class="<?php echo esc_attr($quoteCaptionClass); ?>" role="presentation">
			<?php
			echo Helpers::render('paragraph', Helpers::props('author', $attributes, [
				'blockClass' => $componentClass
			]));
			?>
		</figcaption>
	<?php } ?>
</figure>
