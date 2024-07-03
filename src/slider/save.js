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
export default function save({ attributes }) {
	return (
		<section {...useBlockProps.save({ className: "creative-showcase--slider" })}>
			<div className="banner-horizental">
				<div className="swiper swiper-container-h">
					<div className="swiper-wrapper">
						{attributes.slides?.map((slide) => (
							<div className="swiper-slide">
								<div className="slide-bg overlay-dark" style={{ backgroundImage: `url(${slide.sliderImage})` }} data-swiper-parallax="1152">
									<div className="slide-container">
										<div className="slide-row">
											<div className="slider-content">
												<RichText.Content
													tagName='h6'
													className='slide-subtitle'
													value={slide.sliderSubHeading}
													data-swiper-parallax='-1000'
												/>
												<h1 className="slide-heading" data-swiper-parallax="-2000">
													<a href={slide.sliderHeadingURL}>
														<RichText.Content
															tagName='span'
															value={slide.sliderHeading}
															data-swiper-parallax="-2000"
														/>
													</a>
												</h1>
											</div>
											{slide.sliderVideo && (
												<div className="video-container">
													<video autoplay="" loop="" muted="" baba-icon="yes">
														<source src="https://ui-themez.smartinnovates.net/items/infolio/Infolio/assets/imgs/works/full/vid.mp4" type="video/mp4" />
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
					<div className="swiper-button-wrapper creative-button--wrapper">
						<div className="swiper-button-next" tabindex="0" role="button" aria-label="Next slide">
							<div>
								<span>Next Slide</span>
							</div>
							<div><i className="fas fa-chevron-right"></i></div>
						</div>
						<div className="swiper-button-prev" tabindex="0" role="button" aria-label="Previous slide">
							<div><i className="fas fa-chevron-left"></i></div>
							<div>
								<span>Prev Slide</span>
							</div>
						</div>
					</div>
					<div className="swiper-pagination"></div>
				</div>
			</div>
		</section>
	);
}
