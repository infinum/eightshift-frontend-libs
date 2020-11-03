import React from 'react'; // eslint-disable-line no-unused-vars
import { AlignmentToolbar } from '@wordpress/block-editor';
import { Fragment } from '@wordpress/element';
import manifest from './../manifest.json';

const { attributes: defaults, options } = manifest;

export const ButtonToolbar = (attributes) => {
	const {
		setAttributes,
		buttonShowControls = true,

		buttonUse = defaults.buttonUse.default,
		buttonAlign = defaults.buttonAlign.default,

		showButtonAlign = true,
	} = attributes;

	if (!buttonShowControls) {
		return null;
	}

	return (
		<Fragment>
			{buttonUse &&
				<Fragment>
					{showButtonAlign &&
						<AlignmentToolbar
							value={buttonAlign}
							options={options.aligns}
							onChange={(value) => setAttributes({ buttonAlign: value })}
						/>
					}
				</Fragment>
			}
		</Fragment>
	);
};
