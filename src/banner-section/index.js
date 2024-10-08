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
		banner_heading: {
			type: 'string',
			default: ''
		},
		banner_description: {
			type: 'string',
			default: ''
		},
		banner_image: {
			type: 'string',
			default: 'https://placehold.co/550x708'
		},
		buttonText: {
			type: 'string',
			default: ''
		},
		buttonURL: {
			type: 'string',
			default: ''
		},
		headingFontSize: {
			type: 'number',
			default: 24
		},
		descriptionFontSize: {
			type: 'number',
			default: 16
		},
		buttonTextSize: {
			type: 'number',
			default: 18
		},
		headingColor: {
			type: 'string',
			default: '#000'
		},
		descriptionColor: {
			type: 'string',
			default: '#000'
		},
		buttonTextColor: {
			type: 'string',
			default: '#fff'
		},
		buttonColor: {
			type: 'string',
			default: '#e73671'
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
