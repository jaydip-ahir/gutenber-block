<?php
/**
 * Block Name: Testimonial
 *
 * This is the template that displays the testimonial block.
 */// phpcs:ignore

$avatar      = get_field( 'avatar' );
$id          = 'testimonial-' . $block['id'];// phpcs:ignore
$align_class = $block['align'] ? 'align' . $block['align'] : '';

?>
<blockquote id="<?php echo esc_html( $id ); ?>" class="testimonial <?php echo esc_html( $align_class ); ?>">
	<p><?php the_field( 'testimonial' ); ?></p>
	<cite>
		<img src="<?php echo esc_url( $avatar['url'] ); ?>" alt="<?php echo esc_html( $avatar['alt'] ); ?>" />
		<span><?php the_field( 'author' ); ?></span>
	</cite>
</blockquote>
<style type="text/css">
	#<?php echo esc_html( $id ); ?> {
		background: <?php the_field( 'background_color' ); ?>;
		color: <?php the_field( 'text_color' ); ?>;
	}
</style>
