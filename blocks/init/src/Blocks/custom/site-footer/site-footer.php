<?php

/**
 * Template for the Site footer block.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$manifest = Components::getManifestByDir(__DIR__);

$blockClass = $attributes['blockClass'] ?? '';

$siteFooterLinks = Components::checkAttr('siteFooterLinks', $attributes, $manifest);

if (!empty($siteFooterLinks)) {
	$siteFooterLinks = array_filter($siteFooterLinks, fn($item) => !empty($item['text']) && !empty($item['url'])); // @phpstan-ignore-line
}

$linksClass = Components::selector($blockClass, $blockClass, 'links');
$linkClass = Components::selector($blockClass, $blockClass, 'link');
?>

<div class="<?php echo esc_attr($blockClass); ?>">
	<?php
	echo Components::render('image', Components::props('logo', $attributes, [
		'blockClass' => $blockClass,
		'selectorClass' => 'logo',
	]));
	?>

	<?php if (!empty($siteFooterLinks)) { ?>
		<div class="<?php echo esc_attr($linksClass); ?>">
			<?php
			foreach ($siteFooterLinks as $footerLink) { ?>
				<a
					class="<?php echo esc_attr($linkClass); ?>"
					href="<?php echo esc_url($footerLink['url']); ?>"
				>
					<?php echo esc_attr($footerLink['text']); ?>
				</a>
			<?php } ?>
		</div>
	<?php } ?>

	<?php
	echo Components::render('social-networks', Components::props('socialNetworks', $attributes, [
		'blockClass' => $blockClass,
	])),
	Components::render('copyright', Components::props('copyright', $attributes, [
		'blockClass' => $blockClass,
		'selectorClass' => 'copyright',
	]));
	?>
</div>
