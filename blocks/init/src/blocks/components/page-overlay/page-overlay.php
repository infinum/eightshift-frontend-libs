<?php
/**
 * Template for the Page Overlay Component.
 *
 * @package EightshiftBoilerplate\Blocks.
 */

namespace EightshiftBoilerplate\Blocks;

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$block_class = $attributes['blockClass'] ?? 'page-overlay';

$classes = Components::classnames([
  $block_class,
  "js-{$block_class}",
]);

?>

<div class="<?php echo esc_attr( $classes ); ?>"></div>
