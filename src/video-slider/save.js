/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps,RichText } from '@wordpress/block-editor';

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
		<div {...useBlockProps.save({ className: "video-slider" })}>
			{attributes.slides?.map((slide, index) => (
				<div className={`main-video main-video-${index + 1} ${0 == index ? 'show-video' : ''}`}>
					<div className="video-wrapper">
						{slide.videoURL && (
							<div className="iframe-wrap">
								<iframe src={slide.videoURL} width="560" height="315" frameborder="0" allowfullscreen="allowfullscreen" kwframeid="1"></iframe>
							</div>	
						)}
					</div>
				</div>
			))}
			<div className="secondary-videos">
				{attributes.slides?.map((slide, index) => (
					<div className={`videos video-${index+1} ${0 == index ? 'selected-video' : ''}`}>
						<div className="information">
							<RichText.Content
								value={slide.title}
							/>
						</div>
						<div className="video-wrapper">
 							<img src={slide.image} />	
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
