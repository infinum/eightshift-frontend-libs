# Layout

We've opted to move the theme layout (header, footer, widgets etc.) to the `blocks` folder, since this is going to be all block based [in the near future](https://make.wordpress.org/core/2019/09/05/defining-content-block-areas/).

Inside the `blocks` folder you'll create a `layout` folder, and in it you'll place the `header` folder for instance. Inside you can then have separate `search` part, and separate `navigation` part. Those parts can then be fetched using the `get_template_part` inside your `header.php` partial.

This partial will then be fetched inside your `header.php` template (in the theme root) like

```php
<?php
/**
 * Main header file
 *
 * @since 1.0.0
 */

?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
  <?php
    get_template_part( 'src/blocks/layout/header/components/head/head' );
    wp_head();
  ?>
</head>
<body <?php body_class(); ?>>

<?php get_template_part( 'src/blocks/layout/header/header' ); ?>

<main class="main-content">
```

Similar would be done with the footer and other layout blocks.
