import React from 'react'; // eslint-disable-line no-unused-vars
import { __, sprintf } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { SelectControl, ToggleControl } from '@wordpress/components';

export const AccordionOptions = (attributes) => {
	const {
		setAttributes,
		label = __('Accordion', 'solplanet'),
		showControls = true,

		use = true,
	} = attributes;

	if (!showControls) {
		return null;
	}

	return (
		<Fragment>

			{label &&
				<h3 className={'options-label'}>
					{label}
				</h3>
			}

			<ToggleControl
				label={sprintf(__('Use %s', 'solplanet'), label)}
				checked={use}
				onChange={(value) => setAttributes({
					accordion: {
						...accordion,
						use: value,
					},
				})}
			/>

			{use &&
				<Fragment>

					{showTheme &&
						<SelectControl
							label={__('Theme', 'solplanet')}
							value={theme}
							options={themes}
							onChange={(value) => setAttributes({
								accordion: {
									...accordion,
									theme: value,
								},
							})}
						/>
					}

					{showType &&
						<SelectControl
							label={__('Type', 'solplanet')}
							value={type}
							options={types}
							onChange={(value) => setAttributes({
								accordion: {
									...accordion,
									type: value,
								},
							})}
						/>
					}

				</Fragment>
			}

		</Fragment>
	);
};
