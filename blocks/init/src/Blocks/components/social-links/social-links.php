<?php

/**
 * Social Links
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$manifest = Components::getManifest(__DIR__);
$componentName = $attributes['componentName'] ?? $manifest['componentName'];

$socialLinksUse = Components::checkAttr('socialLinksUse', $attributes, $manifest, $componentName);
if (!$socialLinksUse) {
	return;
}

$componentClass = $attributes['componentClass'] ?? $manifest['componentClass'];
$selectorClass = $attributes['selectorClass'] ?? $componentClass;
$blockClass = $attributes['blockClass'] ?? '';

$socialLinks = Components::checkAttr('socialLinks', $attributes, $manifest, $componentName);
$icons = $manifest['options']['icons'] ?? [];

$socialLinksClass = Components::classnames([
	$componentClass,
	Components::selector($blockClass, $blockClass, $selectorClass),
]);
?>
<ul class="<?php echo \esc_html($socialLinksClass); ?>">
	<?php foreach ($socialLinks as $socialLink) { ?>
		<?php
		$href = $socialLink['href'] ?? '';
		$icon = $socialLink['icon'] ?? '';
		$title = $socialLink['title'] ?? '';

		if (empty($href) || empty($icon) || ! isset($icons[$icon])) {
			continue;
		}
		?>
		<li class="<?php echo \esc_html("{$componentClass}__item"); ?>">
			<a class="<?php echo \esc_html("{$componentClass}__link"); ?>" href="<?php echo esc_url($href); ?>" title="<?php echo esc_attr($title); ?>" target="_blank" rel="nofollow noopener">
				<?php echo \wp_kses_post($icons[$icon]); ?>
			</a>
		</li>
	<?php } ?>
</ul>
