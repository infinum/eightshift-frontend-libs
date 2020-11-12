import React from 'react'; // eslint-disable-line no-unused-vars
import { AlignmentToolbar } from '@wordpress/block-editor';
import { Fragment } from '@wordpress/element';
import manifest from '../manifest.json';

const { options } = manifest;

export const ListsToolbar = (attributes) => {
	const {
		setAttributes,
		listsShowControls = true,

		listsUse,
		listsAlign,

		showlistsAlign = true,
	} = attributes;

	if (!listsShowControls) {
		return null;
	}

	return (
		<Fragment>
			{listsUse &&
				<Fragment>
					{showlistsAlign &&
						<AlignmentToolbar
							value={listsAlign}
							options={options.aligns}
							onChange={(value) => setAttributes({ listsAlign: value })}
						/>
					}
				</Fragment>
			}
		</Fragment>
	);
};
