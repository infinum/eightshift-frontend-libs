<?php
/**
 * Template for the Featured Posts view.
 *
 * @package EightshiftBoilerplate\Blocks.
 */

$block_class = $attributes['blockClass'] ?? '';
$posts       = $attributes['posts'] ?? '';

if( ! $posts ) { return; }
?>

<div class="<?php echo esc_attr( "{$block_class}" ); ?>">
  <?php foreach( $posts as $post ) {
    if ( ! empty ( $post->title->rendered ) ) { ?>
      <h3><?php echo esc_html( $post->title->rendered ); ?></h3>
    <?php }

    if ( ! empty ( $post->excerpt->rendered ) ) { ?>
      <div><?php echo esc_html( $post->excerpt->rendered ); ?></div>
    <?php }
  } ?>
</div>
