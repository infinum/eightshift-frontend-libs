<?php

/**
 * Template for the Jumbotron Block view.
 *
 * @package %g_namespace%
 */

use %g_namespace_vendor_prefix%\EightshiftLibs\Helpers\Components;

$manifest = Components::getManifestByDir(__DIR__);

echo Components::render('jumbotron', Components::props('jumbotron', $attributes));
