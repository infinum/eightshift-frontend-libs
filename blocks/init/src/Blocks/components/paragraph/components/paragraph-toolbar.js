import React from 'react'; // eslint-disable-line no-unused-vars
import { AlignmentToolbar } from '@wordpress/block-editor';
import { Fragment } from '@wordpress/element';
import manifest from './../manifest.json';

const { attributes: defaults, options } = manifest;

export const ParagraphToolbar = (attributes) => {
	const {
		setAttributes,
		paragraphShowControls = true,

		paragraphUse = defaults.paragraphUse.default,
		paragraphAlign = defaults.paragraphAlign.default,

		showParagraphAlign = true,
	} = attributes;

	if (!paragraphShowControls) {
		return null;
	}

	return (
		<Fragment>
			{paragraphUse &&
				<Fragment>
					{showParagraphAlign &&
						<AlignmentToolbar
							value={paragraphAlign}
							options={options.aligns}
							onChange={(value) => setAttributes({ paragraphAlign: value })}
						/>
					}
				</Fragment>
			}
		</Fragment>
	);
};
