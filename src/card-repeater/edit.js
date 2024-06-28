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
import { Modal, Button, __experimentalInputControl as InputControl, __experimentalDivider as Divider } from '@wordpress/components'
import { useState } from '@wordpress/element';

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

	const addItem = () => {
        const newItems = [
            ...attributes.items,
            {
                card_heading: '',
                card_description: '',
                card_link: '',
                card_linktext: '',
                card_image: 'http://placehold.it/580',
                model: false,
            },
        ];
        setAttributes({ items: newItems });
    };

	const removeItem = () => {
        const currentItems = [...attributes.items];
        currentItems.pop();
        setAttributes({ items: currentItems });
    };

	const headleInputFields = (value, index, fieldName) => {
		const updatedValues = [...attributes.items];
		updatedValues[index][fieldName] = value;
		setAttributes({ items: updatedValues })
	}

	return (
		<>
			<div {...useBlockProps({ className: "card-section" })}>
				<div className='container'>
					<div className='main-content'>
						<RichText
							tagName='h2'
							className='main-heading'
							value={attributes.main_heading}
							onChange={(main_heading) => {
								setAttributes({ main_heading })
							}}
							placeholder={__('Section Heading...')}
						/>
						<RichText
							tagName='p'
							className='main-description'
							value={attributes.main_description}
							onChange={(main_description) => {
								setAttributes({ main_description })
							}}
							placeholder={__('Section Description...')}
						/>
					</div>
					<div className='card-wrap'>
						{attributes.items?.map((item, index) => (
							<div className='card'>
								<div style={{ textAlign: "right", paddingTop: "20px", marginBottom: "20px" }}>
									<Button variant="primary" onClick={removeItem}>Remove</Button>
								</div>
								<div className="card-img">
									<MediaUpload
										onSelect={(media=>headleInputFields(media.sizes.full.url, index, 'card_image'))}
										render={({open})=>{
											return <img onClick={open} src={item.card_image} />;
										}}
									/>
								</div>
								<div className="card-content">
									<RichText
										tagName='h2'
										className='card-heading'
										value={item.card_heading}
										onChange={(event) => headleInputFields(event, index, 'card_heading')}
										placeholder={__('Card Heading...')}
									/>
									<RichText
										tagName='p'
										className='card-description'
										value={item.card_description}
										onChange={(event) => headleInputFields(event, index, 'card_description')}
										placeholder={__('Card Description...')}
									/>
									<Button variant="secondary" onClick={() => headleInputFields(true, index, 'model')}>
										{__('Link Model')}
									</Button>
									{item.model && (
										<Modal title="Link Setting" onRequestClose={() => headleInputFields(false, index, 'model')}>
											<InputControl label={__('Link Text')} value={item.card_linktext} placeholder={__('Link Text')} type="text" onChange={(event) => headleInputFields(event, index, 'card_linktext')} />
											<Divider margin="2" />
											<InputControl label={__('Link URL')} value={item.card_link} placeholder={__('Link URL')} type="url" onChange={(event) => headleInputFields(event, index, 'card_link')} />
										</Modal>
									)}
								</div>
							</div>
						))}
					</div>
					<div style={{ textAlign: "center", paddingTop: "20px" }}>
						<Button variant="primary" onClick={addItem}>Add New Card</Button>
					</div>
				</div>
			</div>
		</>
	);

}
