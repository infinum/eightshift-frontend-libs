<?php

/**
 * Template for the Site footer block.
 *
 * @package %g_namespace%
 */

use %g_namespace_vendor_prefix%\EightshiftLibs\Helpers\Helpers;

$manifest = Helpers::getManifestByDir(__DIR__);

$blockClass = $attributes['blockClass'] ?? '';

$siteFooterLinks = Helpers::checkAttr('siteFooterLinks', $attributes, $manifest);

if (!empty($siteFooterLinks)) {
	$siteFooterLinks = array_filter($siteFooterLinks, fn($item) => !empty($item['text']) && !empty($item['url'])); // @phpstan-ignore-line
}

$linksClass = Helpers::selector($blockClass, $blockClass, 'links');
$linkClass = Helpers::selector($blockClass, $blockClass, 'link');
?>

<div class="<?php echo esc_attr($blockClass); ?>">
	<?php
	echo Helpers::render('image', Helpers::props('logo', $attributes, [
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
	echo Helpers::render('social-networks', Helpers::props('socialNetworks', $attributes, [
		'blockClass' => $blockClass,
	])),
	Components::render('copyright', Components::props('copyright', $attributes, [
		'blockClass' => $blockClass,
		'selectorClass' => 'copyright',
	]));
	?>
</div>
