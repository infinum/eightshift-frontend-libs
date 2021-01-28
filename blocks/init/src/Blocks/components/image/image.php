<?php

/**
 * Template for the Image Component.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$manifest = Components::getManifest(__DIR__);
$componentName = $attributes['componentName'] ?? $manifest['componentName'];

$imageUse = Components::checkAttr('imageUse', $attributes, $manifest, $componentName);
if (!$imageUse) {
	return;
}

$componentClass = $attributes['componentClass'] ?? $manifest['componentClass'];
$selectorClass = $attributes['selectorClass'] ?? $componentClass;
$blockClass = $attributes['blockClass'] ?? '';

$imageUrl = Components::checkAttr('imageUrl', $attributes, $manifest, $componentName);
$imageLink = Components::checkAttr('imageLink', $attributes, $manifest, $componentName);
$imageBg = Components::checkAttr('imageBg', $attributes, $manifest, $componentName);
$imageAlign = Components::checkAttr('imageAlign', $attributes, $manifest, $componentName);
$imageAlt = Components::checkAttr('imageAlt', $attributes, $manifest, $componentName);

$imageWrapClass = Components::classnames([
	Components::selector($componentClass, "{$componentClass}-wrap"),
	Components::selector($blockClass, $blockClass, "{$selectorClass}-wrap"),
	Components::selector($imageLink, $imageLink, $componentClass, 'is-link'),
]);

$imageClass = Components::classnames([
	$componentClass,
	Components::selector($imageBg, $componentClass, '', 'bg'),
	Components::selector($blockClass, $blockClass, $selectorClass),
]);

?>

<?php if ($imageLink) { ?>
	<a href="<?php echo \esc_url($imageLink); ?>" class="<?php echo \esc_attr($imageWrapClass); ?>">
<?php } else { ?>
	<div class="<?php echo \esc_attr($imageWrapClass); ?>" data-align="<?php echo \esc_attr($imageAlign); ?>">
<?php } ?>

	<?php if ($imageBg) { ?>
		<div style="background-image:url(<?php echo \esc_url($imageUrl); ?>)" class="<?php echo \esc_attr($imageClass); ?>" ></div>
	<?php } else { ?>
		<img src="<?php echo \esc_url($imageUrl); ?>" class="<?php echo \esc_attr($imageClass); ?>" alt="<?php echo \esc_attr($imageAlt); ?>"/>
	<?php } ?>

<?php if ($imageLink) { ?>
	</a>
<?php } else { ?>
	</div>
<?php } ?>
