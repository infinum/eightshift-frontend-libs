<?php

/**
 * Template for the Jumbotron Block view.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

echo wp_kses_post(Components::render('jumbotron', $attributes));
