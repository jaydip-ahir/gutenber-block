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
		<div { ...useBlockProps.save({ className: "ban_sec" }) }>
            <div className="container">
                <div className="flex -mx-4 items-center lg:flex-col-reverse">
                    <div className="w-6/12 px-4 lg:w-full lg:pt-12">
                        <div className="w-full max-w-[622px] lg:mx-auto lg:text-center">
                            <RichText.Content
                                tagName="h2"
                                className="text-black-100 h2 pb-4"
                                value={attributes.banner_heading}
                            />
                            <RichText.Content
                                tagName="p"
                                className="text-black-100 text-base"
                                value={attributes.banner_description}
                            />
                            <div className="pt-10 [&>a]:btn">
								<a href={attributes.buttonURL} class="button-link">{attributes.buttonText}</a>
                            </div>
                        </div>
                    </div>
                    <div className="w-6/12 px-4 lg:w-full">
                        <div className="media-box text-center">
                            <img
                                decoding="async"
                                loading="lazy"
                                src={attributes.banner_image}
                                className="mx-auto"
                                width="550"
                                height="708"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
	);
}
