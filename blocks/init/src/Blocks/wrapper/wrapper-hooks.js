import { assign } from 'lodash';
import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import globalManifest from '../manifest.json';
import { Wrapper } from './../wrapper/wrapper';
import wrapperManifest from './../wrapper/manifest.json';

const { namespace } = globalManifest;

// Add options to the Gutenberg markup.
const parentComponentBlock = createHigherOrderComponent((BlockListBlock) => {
	return (innerProps) => {
		const {
			name,
			clientId,
		} = innerProps;

		let updatedProps = innerProps;

		if (name.split('/')[0] === namespace) {
			updatedProps = assign(
				{},
				innerProps,
				{
					className: `${globalManifest.globalVariables.customBlocksName} ${innerProps.attributes.blockClass}`,
				}
			);
		}

		return <BlockListBlock {...updatedProps} wrapperProps={{ 'data-id': clientId }} />;
	};
}, 'parentComponentBlock');

const addListBlockClassName = (settings, name) => {
	const blockNameSplit = name.split('/');
	const blockNamespace = blockNameSplit[0];
	const blockName = blockNameSplit[1];

	if ((blockNamespace === namespace)) {
		return settings;
	}

	const common = {
		blockName: {
			type: 'string',
			default: blockName,
		},
		blockFullName: {
			type: 'string',
			default: name,
		},
		blockClass: {
			type: 'string',
			default: `wp-block-${blockName}`,
		},
		blockJsClass: {
			type: 'string',
			default: `js-wp-block-${blockName}`,
		},
	};

	return assign( {}, settings, {
		attributes: assign( {}, settings.attributes, wrapperManifest.attributes, common),
	});
};

const withInspectorControls = createHigherOrderComponent( ( BlockEdit ) => {
	return (props) => {
		const {
			name,
		} = props;

			return (
					<>
						{(name.split('/')[0] !== namespace)
							? <Wrapper props={props}>
									<BlockEdit { ...props } />
								</Wrapper> 
							: <BlockEdit { ...props } />
						}
					</>
			);
	};
}, 'withInspectorControl');

export const hooks = () => {
	addFilter('editor.BlockListBlock', namespace, parentComponentBlock);
	addFilter('blocks.registerBlockType', namespace, addListBlockClassName);
	addFilter('editor.BlockEdit', namespace, withInspectorControls);
};
