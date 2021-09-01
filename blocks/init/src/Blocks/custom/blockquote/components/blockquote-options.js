import React from 'react';
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import { props } from '@eightshift/frontend-libs/scripts';
import { BlockquoteOptions as BlockquoteOptionsComponent } from '../../../components/blockquote/components/blockquote-options';

export const BlockquoteOptions = ({ attributes, setAttributes }) => {
	return (
		<PanelBody title={__('Blockquote', 'eightshift-frontend-libs')}>
			<BlockquoteOptionsComponent
				{...props('blockquote', attributes, {
					setAttributes: setAttributes,
				})}
			/>
		</PanelBody>
	);
};
