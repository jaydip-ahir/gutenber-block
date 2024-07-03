/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the className name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, RichText, MediaUpload } from '@wordpress/block-editor';
import { __experimentalInputControl as InputControl, Button } from '@wordpress/components';

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
export default function Edit({ attributes, setAttributes }) {
	const addSlide = () => {
		const newSlide = [
			...attributes.slides, {
				sliderImage: 'https://placehold.co/1920x1280',
				sliderHeading: '',
				sliderSubHeading: '',
				sliderHeadingURL: '',
				sliderVideo: ''
			}
		];
		setAttributes({ slides: newSlide });
	};
	const headleInputFields = (value, index, fieldName) => {
		const updatedValues = [...attributes.slides];
		updatedValues[index][fieldName] = value;
		setAttributes({ slides: updatedValues });
	}

	return (
		<section {...useBlockProps({ className: "creative-showcase--slider" })}>
			<div className="banner-horizental">
				<div className="swiper swiper-container-h">
					<div className="swiper-wrapper">
						{attributes.slides?.map((slide, index) => (
							<div className="swiper-slide">
								<div className="slide-bg overlay-dark" style={{ backgroundImage: `url(${slide.sliderImage})` }} data-swiper-parallax="1152">
									<MediaUpload
										onSelect={(media => headleInputFields(media.url, index, 'sliderImage'))}
										render={({ open }) => {
											return <button onClick={open}>{__('Add Image')}</button>;
										}}
									/>
									<div className="slide-container">
										<div className="slide-row">
											<div className="slider-content">
												<RichText
													tagName='h6'
													className='slide-subtitle'
													value={slide.sliderSubHeading}
													onChange={(event) => headleInputFields(event, index, 'sliderSubHeading')}
													placeholder='Sub Heading...'
												/>
												<h1 className="slide-heading" data-swiper-parallax="-2000">
													<RichText
														tagName='span'
														value={slide.sliderHeading}
														onChange={(event) => headleInputFields(event, index, 'sliderHeading')}
														placeholder='Heading...'
													/>
													<InputControl label={__('Heading Link')} value={slide.sliderHeadingURL} placeholder={__('Heading Link')} type="url" onChange={(event) => headleInputFields(event, index, 'sliderHeadingURL')} />
												</h1>
											</div>
											{ slide.sliderVideo && (
												<div className="video-container">
													<video autoplay="" loop="" muted="" baba-icon="yes">
														<source src={slide.sliderVideo} type="video/mp4" />
													</video>
												</div>
												)
											}
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
			<div style={{ textAlign: "center", paddingTop: "20px" }}>
				<Button variant="primary" onClick={addSlide}>Add New Slide</Button>
			</div>
		</section>
	);
}
