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
import { useBlockProps, RichText, MediaUpload, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, Button } from '@wordpress/components';

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

	return (
		<div { ...useBlockProps({ className: "ban_sec" }) }>
			<InspectorControls group="styles">
                <PanelBody title={ __('Link Settings', 'banner-section') }>
					<TextControl
						label={ __('Banner Button URL', 'banner-section') }
						value={ attributes.buttonURL }
						onChange={ ( buttonURL ) => setAttributes({ buttonURL }) }
					/>
                </PanelBody>
            </InspectorControls>
			<div className="container">
				<div className="flex -mx-4 items-center lg:flex-col-reverse">
					<div className="w-6/12 px-4 lg:w-full lg:pt-12">
						<div className="w-full max-w-[622px] lg:mx-auto lg:text-center">
							<RichText
								tagName="h2"
								className="text-black-100 h2 pb-4"
								value={attributes.banner_heading}
								onChange={(banner_heading) => setAttributes({ banner_heading })}
								placeholder={__('Banner Heading...')}
							/>
							<RichText
								tagName="p"
								className="text-black-100 text-base"
								value={attributes.banner_description}
								onChange={(banner_description) => setAttributes({ banner_description })}
								placeholder={__('Banner Description...')}
							/>
							<div className="pt-10 [&>a]:btn">
								<button>
									<RichText
										className='richtext-border'
										value={attributes.buttonText}
										allowedFormats={[]}
										onChange={ ( buttonText) => setAttributes({ buttonText })}
										placeholder={ __( 'Add Button Text...' ) }
									/>
								</button>
							</div>
						</div>
					</div>
					<div className="w-6/12 px-4 lg:w-full">
						<div className="media-box text-center">
							<MediaUpload
								onSelect={(media) => setAttributes({ banner_image: media.url })}
								allowedTypes={['image']}
								render={({open}) => (
									<img
										decoding="async"
										loading="lazy"
										onClick={open}
										src={attributes.banner_image}
										className="mx-auto"
										width="550"
										height="708"
									/>
								)}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
