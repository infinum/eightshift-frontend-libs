import React, {useState} from 'react';
import { NumberPicker } from '../number-picker';
import { SingleItemShowcase } from '../../../storybook/helpers';
import { icons } from '../../../editor';

export default {
	title: 'Options/NumberPicker',
};

export const regular = () => {
	const [value, setValue] = useState(0);

	return (
		<SingleItemShowcase title='Basic control'>
			<NumberPicker
				min={0}
				max={100}
				value={value}
				onChange={(v) => setValue(v)}
				label='Number control'
				subtitle='Subtitle'
				icon={icons.emptyCircle}
				actions={<div className='es-h-spaced es-gap-1!'>{icons.emptyRect}{icons.emptyRect}</div>}
				inlineLabel
				noBottomSpacing
			/>
		</SingleItemShowcase>
	);
};
