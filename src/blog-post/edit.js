/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({attributes, setAttributes}) {

	const fetchData = () => {
		const apiUrl = `${wpApiSettings.root}wp/v2/posts?_embed`;
		fetch(apiUrl)
		.then(response => {
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			return response.json();
		})
		.then(data => {
			setAttributes({postsData:data});
		})
		.catch(error => {
			console.error('Error fetching posts:', error);
		});
	}
	if (attributes.postsData.length === 0) {
		fetchData();
	}
	return (
		<div {...useBlockProps()}>	
		{
			attributes.postsData.length === 0 ? (
				<p>No posts found.</p>
			) : (
				<ul>
					{attributes.postsData?.map(post => (
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
