<?php

/**
 * Template for the Jumbotron Block view.
 *
 * @package %g_namespace%
 */

use %g_namespace_vendor_prefix%\EightshiftLibs\Helpers\Helpers;

$manifest = Helpers::getManifestByDir(__DIR__);

echo Helpers::render('jumbotron', Helpers::props('jumbotron', $attributes));
