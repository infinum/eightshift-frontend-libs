import React from 'react';
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import { getAttrKey, getOption, props, SimpleHorizontalSingleSelect, checkAttr } from '@eightshift/frontend-libs/scripts';
import { ListsOptions as ListsOptionsComponent } from '../../../components/lists/components/lists-options';
import manifest from './../manifest.json';

export const ListsOptions = ({ attributes, setAttributes }) => {
	const listsAlign = checkAttr('listsAlign', attributes, manifest);

	return (
		<PanelBody title={__('List', 'eightshift-frontend-libs')}>
			<ListsOptionsComponent
				{...props('lists', attributes, {
					setAttributes,
				})}
				showListsUse={false}
				showLabel={false}
				showExpanderButton={false}
				additionalControlsSplitArea={
					<SimpleHorizontalSingleSelect
						value={listsAlign}
						options={getOption('listsAlign', attributes, manifest)}
						label={__('Text align', 'eightshift-frontend-libs')}
						onChange={(value) => setAttributes({ [getAttrKey('listsAlign', attributes, manifest)]: value })}
						border='offset'
						iconOnly
					/>
				}
			/>
		</PanelBody>
	);
};
