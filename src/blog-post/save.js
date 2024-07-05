/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */

import { useBlockProps } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {Element} Element to render.
 */
export default function save({attributes}) {
	console.log(attributes.postsData);
	return (
		<div {...useBlockProps.save()}>
		{
			attributes.postsData.length === 0 ? (
				<p>No posts found.</p>
			) : (
				<ul>
					{attributes.postsData.map(post => (
						<li key={post.id}>
							<a href={post.link}>
								{post._embedded['wp:featuredmedia'] && (
									<img 
										src={post._embedded['wp:featuredmedia'][0].source_url}
										alt={post._embedded['wp:featuredmedia'][0].alt_text || post.title.rendered} 
									/>
								)}
								<h2>{post.title.rendered}</h2>
								<div dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
							</a>
						</li>
					))}
				</ul>
			)
		}
		</div>
	);
}
