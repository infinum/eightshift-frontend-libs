import React from 'react';
import { __ } from '@wordpress/i18n';
import { checkAttr, CompactResponsive, getAttrKey, IconLabel, icons, SimpleHorizontalSingleSelect, getDefaultBreakpointNames } from '@eightshift/frontend-libs/scripts';

/**
 * A responsive block/component visibility control.
 *
 * @param {object} props                           - VisibilityToggleResponsive options.
 * @param {React.Component?} [props.icon]          - Icon to add meaning to the option.
 * @param {React.Component?} [props.label]         - Description of the option.
 * @param {Object} props.manifest                  - The component/block manifest.
 * @param {Object} props.attributes                - Attributes of the current component/block.
 * @param {string} props.attributeName             - Attribute name you want to change.
 * @param {callback} props.setAttributes           - The `setAttributes` callback from the component/block.
 * @param {string?} [props.additionalClasses]      - If provided, the classes are passed to the component.
 * @param {Array<string>?} [props.breakpointNames] - Breakpoint names to process, by default taken from Global manifest.
 */
export const VisibilityToggleResponsive = (props) => {
	const {
		icon = icons.visibility,
		label=__('Block visibility', 'eightshift-frontend-libs'),
		additionalClasses,
		breakpointNames = getDefaultBreakpointNames(),
		manifest,
		attributes,
		attributeName,
		setAttributes,
	} = props;

	const {
		responsiveAttributes: manifestResponsiveAttributes,
	} = manifest;

	const { [attributeName]: attrNames } = manifestResponsiveAttributes;

	return (
		<CompactResponsive
			label={<IconLabel icon={icon} label={label} />}
			additionalClasses={`-es-mb-xs-important ${additionalClasses ?? ''}`}
			breakpoints={breakpointNames}
			inheritButton={breakpointNames.map((breakpoint) => {
				const breakpointAttrName = attrNames[breakpoint];
				const breakpointAttrValue = checkAttr(breakpointAttrName, attributes, manifest);

				const isInherited = typeof breakpointAttrValue === 'undefined' || breakpointAttrValue === '';

				return {
					callback: () => setAttributes({ [getAttrKey(breakpointAttrName, attributes, manifest)]: isInherited ? false : undefined }),
					isActive: isInherited,
				};
			})}
		>
			{breakpointNames.map((breakpoint, index) => {
				const breakpointAttrName = attrNames[breakpoint];
				const breakpointAttrValue = checkAttr(breakpointAttrName, attributes, manifest);

				let options = [
					{ label: __('Visible', 'eightshift-frontend-libs'), value: 'false', icon: icons.visible },
					{ label: __('Hidden', 'eightshift-frontend-libs'), value: 'true', icon: icons.hide },
				];

				return (
					<SimpleHorizontalSingleSelect
						key={index}
						options={options}
						border='offset'
						value={breakpointAttrValue?.toString()}
						onChange={(value) => setAttributes({ [getAttrKey(breakpointAttrName, attributes, manifest)]: typeof breakpointAttrValue === 'boolean' ? value === 'true' : value })}
						additionalClass='-es-mt-s'
					/>
				);
			})}
		</CompactResponsive>
	);
};
