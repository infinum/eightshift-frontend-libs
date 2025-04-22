import { __ } from '@wordpress/i18n';
import { RichLabel, Button } from '@eightshift/ui-components';
import { icons, blockIcons, BlockIcon } from '@eightshift/ui-components/icons';
import { dispatch } from '@wordpress/data';
import { createBlock } from '@wordpress/blocks';
import { BlockInserter } from '../block-inserter/block-inserter';

/**
 * A placeholder that allows picking from a list of presets.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string|JSX.Element} [props.title] - Block name. Overrides manifest value (if provided).
 * @param {Array} [props.presets] - Presets to show the user.
 * @param {string} props.presets.name - Preset name.
 * @param {string} props.presets.icon - Icon name. (See `icons` object in `@eightshift/ui-components/icons`).
 * @param {array} [props.presets.blocks] - Inner blocks to be added by the preset.
 * @param {object} [props.presets.attributes] - Attributes to set to the current block.
 * @param {string|JSX.Element} [props.blockIcon] - Block icon to show next to the title. Can either be a string (icon/block icon name - block icons have precedence), or a JSX element.
 * @param {string} props.clientId - Client ID of the block.
 * @param {object} [props.manifest] - Block/component manifest (if you don't want to provide title, presets, and block icon manually).
 * @param {boolean|JSX.Element} [props.inserter] - `true` if you want to show the default inserter, or a custom element.
 * @param {string} [props.presetsHeading] - Heading for the presets section.
 * @param {boolean} [props.hidden] - If `true`, the component is not rendered.
 *
 * @returns {JSX.Element} The PickerPlaceholder component.
 *
 * @example
 * <PickerPlaceholder presets={presets} title='My block' />
 *
 * @preserve
 */
export const PickerPlaceholder = (props) => {
	const {
		title: rawTitle,
		presets: rawPresets,
		blockIcon: rawBlockIcon,
		onChange,
		clientId,
		manifest,
		inserter,
		presetsHeading = __('Select a preset', 'eightshift-frontend-libs-tailwind'),
		hidden,
	} = props;

	const title = rawTitle ?? manifest?.title;
	const blockIcon = rawBlockIcon ?? manifest?.icon?.src;
	const presets = rawPresets ?? manifest?.layoutPresets;

	let icon = blockIcon ?? icons.componentGeneric;

	if (blockIcon in blockIcons) {
		icon = <BlockIcon iconName={blockIcon} />;
	} else if (blockIcon in icons) {
		icon = icons[blockIcon];
	}

	if (hidden) {
		return null;
	}

	return (
		<div className='es:font-sans es:border-gray-200 es:mx-auto es:grid es:max-w-72 es:grid-cols-2 es:gap-1.5 es:rounded-lg es:border es:p-3 es:text-xs es:shadow-lg'>
			<RichLabel
				icon={icon}
				label={title}
				className='col-span-2 mb-2 select-none font-medium !text-gray-400'
			/>

			<span className='es:col-span-2 es:select-none es:justify-self-center'>{presetsHeading}</span>

			{presets.map(({ name, icon, blocks: blockData, attributes: attrsToSet }, index) => {
				return (
					<Button
						key={index}
						onPress={async () => {
							const blocksToInsert = blockData.map(({ name: blockName, attributes: blockAttrs }) => createBlock(blockName, blockAttrs));

							onChange(attrsToSet);

							await dispatch('core/block-editor').insertBlocks(blocksToInsert, 0, clientId);
						}}
						icon={icons?.[icon]}
						size='large'
					>
						{name}
					</Button>
				);
			})}

			{inserter && (
				<>
					<span className='es:col-span-2 es:select-none es:justify-self-center'>{__('or', 'fe-libs-tailwind')}</span>

					<div className='es:col-span-2 es:justify-self-center'>
						{inserter}

						{inserter === true && (
							<BlockInserter
								label
								clientId={clientId}
							/>
						)}
					</div>
				</>
			)}
		</div>
	);
};
