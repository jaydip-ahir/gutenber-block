/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, RichText } from '@wordpress/block-editor';

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

	return (
		<>
			<div {...useBlockProps.save({ className: "card-section" })}>
				<div className='container'>
					<div className='main-content'>
						<RichText.Content
							tagName='h2'
							className='main-heading'
							value={attributes.main_heading}
						/>
						<RichText.Content
							tagName='p'
							className='main-description'
							value={attributes.main_description}
						/>
					</div>
					<div className='card-wrap'>
						{attributes.items?.map((item) => (
							<div className='card'>
								<div className="card-img">
									<img src={ item.card_image } />
								</div>
								<div className="card-content">
									<RichText.Content
										tagName='h2'
										className='card-heading'
										value={item.card_heading}
									/>
									<RichText.Content
										tagName='p'
										className='card-description'
										value={item.card_description}
									/>
									{ item.card_linktext && item.card_link && (
										<div className="cta">
											<a href={item.card_link} className="btn btn-link">
												{item.card_linktext}
											</a>
										</div>
									)}
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	);
	
}
