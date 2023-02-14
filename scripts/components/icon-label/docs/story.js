import React from 'react';
import { IconLabel } from '../icon-label';
import { icons } from '@eightshift/frontend-libs/scripts';
import readme from './readme.mdx';
import { SingleItemShowcase } from '../../../storybook/helpers';

export default {
	title: 'Options/IconLabel',
	parameters: {
		docs: {
			page: readme
		}
	},
};

export const component = () => {
	return (
		<>
			<h1 className='es-mt-0 es-mb-5 es-p-0 es-text-8'>IconLabel</h1>

			<div className='es-display-flex es-flex-wrap es-gap-5!'>
				<SingleItemShowcase title='Basic label'>
					<IconLabel
						icon={icons.genericShapesAlt}
						label='Shapes'
						standalone
					/>
				</SingleItemShowcase>

				<SingleItemShowcase title='Subtitle'>
					<IconLabel
						icon={icons.layoutAlt3}
						label='Layout'
						subtitle='3 columns'
						standalone
					/>
				</SingleItemShowcase>

				<SingleItemShowcase title='Subtitle gap' propsUsed={{ addSubtitleGap: 'Useful in some complex layouts where default Gutenberg styles would make the gap too small' }}>
					<div className='es-fifty-fifty-h'>
						<IconLabel
							icon={icons.colorAlt}
							label='No gap'
							subtitle='Subtitle'
							standalone
						/>

						<IconLabel
							icon={icons.colorAlt}
							label='With gap'
							subtitle='Subtitle'
							standalone
							addSubtitleGap
						/>
					</div>
				</SingleItemShowcase>

				<SingleItemShowcase title='Custom classes' propsUsed={{ additionalClasses: 'Allows passing custom classes to the label' }}>
					<IconLabel
						icon={icons.colorAlt}
						label='Color'
						subtitle='Blue'
						standalone
						additionalClasses='es-nested-color-blue-500!'
					/>
				</SingleItemShowcase>
			</div>
		</>
	);
};
