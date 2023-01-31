<?php

/**
 * Template for the Jumbotron Block view.
 *
 * @package EightshiftBoilerplate
 */

use EightshiftBoilerplateVendor\EightshiftLibs\Helpers\Components;

$manifest = Components::getManifest(__DIR__);

echo Components::render('jumbotron', Components::props('jumbotron', $attributes));
