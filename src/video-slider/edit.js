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
import { useBlockProps, RichText, MediaUpload } from '@wordpress/block-editor';
import { Modal, Button, __experimentalInputControl as InputControl } from '@wordpress/components'
import { useState, useEffect } from 'react';

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
	const [selectedVideo, setSelectedVideo] = useState(0);
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const checkIfMobile = () => {
			const videoElement = document.querySelector('.videos');
			if (videoElement) {
				setIsMobile(window.getComputedStyle(videoElement).float === 'none');
			}
		};

		checkIfMobile();
		window.addEventListener('resize', checkIfMobile);

		return () => {
			window.removeEventListener('resize', checkIfMobile);
		};
	}, []);

	const addSlide = () => {
		const newSlide = [
			...attributes.slides,
			{
				title: '',
				videoURL: '',
				image: 'https://placehold.co/200x150',
				model: false,
			},
		];
		setAttributes({ slides: newSlide });
	};

	const removeSlide = (index) => {
		const currentSlides = [...attributes.slides];
		currentSlides.splice(index, 1);
		setAttributes({ slides: currentSlides });
	};

	const changeValue = (value, index, fieldName) => {
		const newValue = [...attributes.slides];
		newValue[index][fieldName] = value;
		setAttributes({ slides: newValue });
	};

	const handleVideoClick = (index) => {
		setSelectedVideo(index);

		// Stop all videos
		document.querySelectorAll('.main-video.show-video .video-wrapper iframe').forEach((iframe) => {
			const videoSrc = iframe.getAttribute('src');
			iframe.setAttribute('src', '');
			iframe.setAttribute('src', videoSrc);
		});
	};

	return (
		<div {...useBlockProps({ className: 'video-slider' })}>
			{attributes.slides?.map((slide, index) => (
				<div
					key={index}
					className={`main-video main-video-${index + 1} active-jq ${selectedVideo === index ? 'show-video' : ''}`}
				>
					<div className="video-wrapper">
						<div className="btn-wrap">
							<Button variant="primary" onClick={() => removeSlide(index)}>
								{__('Remove Slide')}
							</Button>
							<Button variant="secondary" onClick={() => changeValue(true, index, 'model')}>
								{__('Add Video URL')}
							</Button>
						</div>
						{slide.videoURL && (
							<div className="iframe-wrap">
								<iframe
									src={slide.videoURL}
									width="560"
									height="315"
									frameBorder="0"
									allowFullScreen="allowFullScreen"
									kwframeid={index}
								></iframe>
							</div>
						)}
						{slide.model && (
							<Modal title="Enter Video URL" onRequestClose={() => changeValue(false, index, 'model')}>
								<InputControl
									value={slide.videoURL}
									onChange={(newValue) => changeValue(newValue, index, 'videoURL')}
								/>
							</Modal>
						)}
					</div>
				</div>
			))}
			<div className="secondary-videos">
				{attributes.slides?.map((slide, index) => (
					<div
						key={index}
						className={`videos video-${index + 1} active-jq ${selectedVideo === index ? 'selected-video' : ''}`}
						onClick={() => handleVideoClick(index)}
					>
						<div className="information">
							<RichText
								value={slide.title}
								onChange={(newValue) => changeValue(newValue, index, 'title')}
								placeholder="Title..."
							/>
						</div>
						<div className="video-wrapper">
							<img src={slide.image} alt="Slide Image" />
						</div>
							<MediaUpload
								onSelect={(media) => changeValue(media.url, index, 'image')}
								render={({ open }) => (
									<>
										<Button onClick={open}>{__('Add Image')}</Button>
									</>
								)}
							/>
					</div>
				))}
			</div>
			<div className='btn-wrap'>
				<Button variant="primary" onClick={addSlide}>
					{__('Add Slide')}
				</Button>
			</div>
		</div>
	);
}
