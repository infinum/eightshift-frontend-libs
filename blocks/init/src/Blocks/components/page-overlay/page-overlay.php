<?php
/**
 * Template for the Page Overlay Component.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$blockClass = $attributes['blockClass'] ?? 'page-overlay';

$classes = Components::classnames([
  $blockClass,
  "js-{$blockClass}",
]);

?>

<div class="<?php echo esc_attr( $classes ); ?>"></div>
