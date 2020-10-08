<?php

/**
 * Copyright component responsible for rendering site's copyright.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$componentClass = $attributes['componentClass'] ?? 'copyright';
$blockClass = $attributes['blockClass'] ?? '';
$by = $attributes['by'] ?? 'Infinum';
$year = $attributes['year'] ?? gmdate('Y');

$copyClass = Components::classnames([
	$componentClass,
	$blockClass ? "{$blockClass}__{$componentClass}" : '',
]);

?>
<div class="<?php echo \esc_attr($copyClass); ?>">
	<?php \esc_html("&copy; {$year} {$by}"); ?>
</div>
