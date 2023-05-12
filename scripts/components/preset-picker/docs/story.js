import React, { useState } from 'react';
import { PresetPicker } from '../preset-picker';
import readme from './readme.mdx';
import { SingleItemShowcase } from '../../../storybook/helpers';
import { icons } from '../../../editor';

export default {
	title: 'Options/PresetPicker',
	parameters: {
		docs: {
			page: readme
		}
	},
};

export const component = () => {
	const [state, setState] = useState({});

	const fakeManifest = {
		attributes: {
			color: {
				type: 'string',
			},
			content: {
				type: 'string',
				default: '_',
			},
		},
		configPresets: [
			{
				name: 'Red',
				icon: 'num1Circle',
				attributes: {
					color: 'red',
				}
			},
			{
				name: 'Blue',
				icon: 'num2Circle',
				attributes: {
					color: 'blue',
				}
			}
		]
	};

	return (
		<>
			<h1 className='es-mt-0 es-mb-5 es-p-0 es-text-8'>PresetPicker</h1>

			<div className='es-display-flex es-flex-wrap es-gap-5!'>
				<SingleItemShowcase title='Basic control'>
					<div className='es-w-20 es-h-20 es-rounded-1 es-mb-4 es-border-cool-gray-300 es-text-pure-white' style={{ backgroundColor: state?.color }}>
						{state?.content ?? ''}
					</div>

					<PresetPicker
						manifest={fakeManifest}
						setAttributes={setState}
						noBottomSpacing
					/>
				</SingleItemShowcase>

				<SingleItemShowcase title='Collapsable'>
					<div className='es-w-20 es-h-20 es-rounded-1 es-mb-4 es-border-cool-gray-300 es-text-pure-white' style={{ backgroundColor: state?.color }}>
						{state?.content ?? ''}
					</div>

					<PresetPicker
						manifest={fakeManifest}
						setAttributes={setState}
						showAsCollapsable
						noBottomSpacing
					/>
				</SingleItemShowcase>

				<SingleItemShowcase title='Buttons only'>
					<div className='es-w-20 es-h-20 es-rounded-1 es-mb-4 es-border-cool-gray-300 es-text-pure-white' style={{ backgroundColor: state?.color }}>
						{state?.content ?? ''}
					</div>

					<PresetPicker
						manifest={fakeManifest}
						setAttributes={setState}
						noBottomSpacing
						controlOnly
					/>
				</SingleItemShowcase>

				<SingleItemShowcase title='"Default" button'>
					<div className='es-w-20 es-h-20 es-rounded-1 es-mb-4 es-border-cool-gray-300 es-text-pure-white' style={{ backgroundColor: state?.color }}>
						{state?.content ?? ''}
					</div>

					<PresetPicker
						manifest={fakeManifest}
						setAttributes={setState}
						noBottomSpacing
						defaultButton
					/>
				</SingleItemShowcase>

				<SingleItemShowcase title='Customized "Default" button'>
					<div className='es-w-20 es-h-20 es-rounded-1 es-mb-4 es-border-cool-gray-300 es-text-pure-white' style={{ backgroundColor: state?.color }}>
						{state?.content ?? ''}
					</div>

					<PresetPicker
						manifest={fakeManifest}
						setAttributes={setState}
						noBottomSpacing
						defaultButton={{ label: 'DefaultLabel', icon: icons.genericShapesAlt, attributes: {color: 'green', content: 'rst'} }}
					/>
				</SingleItemShowcase>

				<SingleItemShowcase title='"Off" button'>
					<div className='es-w-20 es-h-20 es-rounded-1 es-mb-4 es-border-cool-gray-300 es-text-pure-white' style={{ backgroundColor: state?.color }}>
						{state?.content ?? ''}
					</div>

					<PresetPicker
						manifest={fakeManifest}
						setAttributes={setState}
						noBottomSpacing
						offButton={{ label: 'OffLabel', icon: icons.toggleOff, attributes: {color: 'magenta', content: 'off'} }}
					/>
				</SingleItemShowcase>
			</div>
		</>
	);
};
