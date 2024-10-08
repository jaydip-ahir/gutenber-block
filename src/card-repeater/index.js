/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './style.scss';

/**
 * Internal dependencies
 */
import Edit from './edit';
import save from './save';
import metadata from './block.json';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType( metadata.name, {
	attributes: {
		main_heading: {
			type: 'string',
			default: ''
		},
		main_description: {
			type: 'string',
			default: ''
		},
		items: {
			type: 'array',
			default: [
				{
					card_image: 'http://placehold.it/580',
					card_heading: '',
					card_description: '',
					card_link: '',
					card_linktext: 'Button Text..',
					model: false
				}
			]
		},
		settings: {
			type: 'object',
			default: {
				mainHeading: {
					size: 45,
					color: '#f1f1f1'
				},
				mainDescription: {
					size: 18,
					color: '#f1f1f1'
				},
				cardHeading: {
					size: 40,
					color: '#000'
				},
				cardDescription: {
					size: 18,
					color: '#000'
				},
				cardButton: {
					size: 18,
					color: '#fff',
					background: '#a02424'
				}
			}
		}
	},
	/**
	 * @see ./edit.js
	 */
	edit: Edit,

	/**
	 * @see ./save.js
	 */
	save,
} );
