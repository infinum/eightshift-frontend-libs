import React, { useState } from 'react';
import readme from './readme.mdx';
import { Slider } from '../custom-slider';
import { RangeSlider } from '../custom-range-slider';
import { icons } from '@eightshift/frontend-libs/scripts';
import { SingleItemShowcase } from '../../../storybook/helpers';
import { ColumnConfigSlider } from '../column-config-slider';

export default {
	title: 'Options/Slider',
	parameters: {
		docs: {
			page: readme
		}
	},
};

const baseSliderProps = {
	min: 1,
	max: 100,
	noBottomSpacing: true,
	label: 'Slider control',
	subtitle: 'Subtitle',
	icon: icons.emptyCircle,
	actions: <div className='es-h-spaced es-gap-1!'>{icons.emptyRect}{icons.emptyRect}</div>,
};

export const slider = () => {
	const [value, setValue] = useState(8);

	return (
		<>
			<h1 className='es-mt-0 es-mb-5 es-p-0 es-text-8'>Slider</h1>

			<div className='es-display-flex es-flex-wrap es-gap-5!'>
				<SingleItemShowcase title='Basic slider'>
					<Slider
						{...baseSliderProps}
						value={value}
						onChange={(value) => setValue(value)}
					/>
				</SingleItemShowcase>

				<SingleItemShowcase title='Auto-generated marks'>
					<Slider
						{...baseSliderProps}
						value={value}
						onChange={(value) => setValue(value)}
						marks
					/>
				</SingleItemShowcase>

				<SingleItemShowcase title='Additions'>
					<Slider
						{...baseSliderProps}
						value={value}
						onChange={(value) => setValue(value)}
						leftAddition={icons.emptyRect}
						rightAddition={icons.emptyRect}
					/>
				</SingleItemShowcase>

				<SingleItemShowcase title='Value display'>
					<Slider
						{...baseSliderProps}
						value={value}
						onChange={(value) => setValue(value)}
						valueDisplay
					/>
				</SingleItemShowcase>

				<SingleItemShowcase title='Custom value display'>
					<Slider
						{...baseSliderProps}
						value={value}
						onChange={(value) => setValue(value)}
						valueDisplay
						valueDisplayElement={<span style={{ color: 'purple', fontFamily: 'serif', fontWeight: 'bold', fontSize: '1rem' }}><small>Value:</small> {value}</span>}
					/>
				</SingleItemShowcase>

				<SingleItemShowcase title='Input field'>
					<Slider
						{...baseSliderProps}
						value={value}
						onChange={(value) => setValue(value)}
						inputField
					/>
				</SingleItemShowcase>

				<SingleItemShowcase title='Reversed slider'>
					<Slider
						{...baseSliderProps}
						value={value}
						onChange={(value) => setValue(value)}
						reverse
					/>
				</SingleItemShowcase>

				<SingleItemShowcase title='Disabled'>
					<Slider
						{...baseSliderProps}
						value={value}
						onChange={(value) => setValue(value)}
						marks
						inputField
						disabled
					/>
				</SingleItemShowcase>

				<SingleItemShowcase title='Custom step value'>
					<Slider
						{...baseSliderProps}
						value={value}
						onChange={(value) => setValue(value)}
						step={2}
					/>
				</SingleItemShowcase>

				<SingleItemShowcase title='Dots'>
					<Slider
						{...baseSliderProps}
						value={value}
						onChange={(value) => setValue(value)}
						marks='dots'
						step={10}
					/>
				</SingleItemShowcase>

				<SingleItemShowcase title='Custom track color'>
					<Slider
						{...baseSliderProps}
						value={value}
						onChange={(value) => setValue(value)}
						trackColor='red'
					/>
				</SingleItemShowcase>

				<SingleItemShowcase title='Custom rail color'>
					<Slider
						{...baseSliderProps}
						value={value}
						onChange={(value) => setValue(value)}
						railColor='green'
					/>
				</SingleItemShowcase>

				<SingleItemShowcase title='Custom track and rail color'>
					<Slider
						{...baseSliderProps}
						value={value}
						onChange={(value) => setValue(value)}
						trackColor='linear-gradient(270deg, yellow, orange)'
						railColor='linear-gradient(90deg, #00DBDE 0%, #FC00FF 100%)'
					/>
				</SingleItemShowcase>

				<SingleItemShowcase title='Custom handle color'>
					<Slider
						{...baseSliderProps}
						value={value}
						onChange={(value) => setValue(value)}
						handleColor='linear-gradient(-45deg, red, orange)'
					/>
				</SingleItemShowcase>

				<SingleItemShowcase title='Custom mark colors'>
					<Slider
						{...baseSliderProps}
						value={value}
						onChange={(value) => setValue(value)}
						marks
						activeMarkColor='red'
						inactiveMarkColor='green'
					/>
				</SingleItemShowcase>

				<SingleItemShowcase title='Fully customized slider'>
					<Slider
						{...baseSliderProps}
						value={value}
						onChange={(value) => setValue(value)}
						marks
						trackColor='red'
						railColor='green'
						activeMarkColor='red'
						inactiveMarkColor='green'
						handleColor='red'
					/>
				</SingleItemShowcase>

				<SingleItemShowcase title='Custom start point'>
					<Slider
						{...baseSliderProps}
						value={value}
						onChange={(value) => setValue(value)}
						startPoint={50}
					/>
				</SingleItemShowcase>

				<SingleItemShowcase title='Discrete value'>
					<Slider
						{...baseSliderProps}
						value={value}
						onChange={(value) => setValue(value)}
						discrete
						marks
					/>
				</SingleItemShowcase>
			</div>
		</>
	);
};

export const range_slider = () => {
	const [value, setValue] = useState([10, 30]);
	const [value2, setValue2] = useState([10, 30, 50]);

	return (
		<>
			<h1 className='es-mt-0 es-mb-5 es-p-0 es-text-8'>Range slider</h1>

			<div className='es-display-flex es-flex-wrap es-gap-5!'>
				<SingleItemShowcase title='Basic slider'>
					<RangeSlider
						{...baseSliderProps}
						value={value}
						onChange={(value) => setValue(value)}
					/>
				</SingleItemShowcase>

				<SingleItemShowcase title='Marks'>
					<RangeSlider
						{...baseSliderProps}
						value={value}
						onChange={(value) => setValue(value)}
						marks
					/>
				</SingleItemShowcase>

				<SingleItemShowcase title='Value display'>
					<RangeSlider
						{...baseSliderProps}
						value={value}
						onChange={(value) => setValue(value)}
						valueDisplay
					/>
				</SingleItemShowcase>

				<SingleItemShowcase title='Input fields'>
					<RangeSlider
						{...baseSliderProps}
						value={value}
						onChange={(value) => setValue(value)}
						inputField
					/>
				</SingleItemShowcase>

				<SingleItemShowcase title='Draggable track'>
					<RangeSlider
						{...baseSliderProps}
						value={value}
						onChange={(value) => setValue(value)}
						draggableTrack
					/>
				</SingleItemShowcase>

				<SingleItemShowcase title='Multiple ranges'>
					<RangeSlider
						{...baseSliderProps}
						value={value2}
						onChange={(value) => setValue2(value)}
					/>
				</SingleItemShowcase>

				<SingleItemShowcase title='Pushable values'>
					<RangeSlider
						{...baseSliderProps}
						value={value}
						onChange={(value) => setValue(value)}
						pushable
					/>
				</SingleItemShowcase>

				<SingleItemShowcase title='Pushable ranges with minimum distance between handles'>
					<RangeSlider
						{...baseSliderProps}
						value={value}
						onChange={(value) => setValue(value)}
						pushable={10}
					/>
				</SingleItemShowcase>

				<SingleItemShowcase title='Non-crossable ranges'>
					<RangeSlider
						{...baseSliderProps}
						value={value}
						onChange={(value) => setValue(value)}
						noCross
					/>
				</SingleItemShowcase>

				<SingleItemShowcase title='Discrete values'>
					<RangeSlider
						{...baseSliderProps}
						value={value}
						onChange={(value) => setValue(value)}
						discrete
					/>
				</SingleItemShowcase>
			</div>
		</>
	);
};

export const Column_Config_Slider = () => {
	const [value, setValue] = useState([2, 4]);

	return (
		<>
			<h1 className='es-mt-0 es-mb-5 es-p-0 es-text-8'>Column config slider</h1>

			<div className='es-display-flex es-flex-wrap es-gap-5!'>
				<SingleItemShowcase title='Basic slider'>
					<ColumnConfigSlider
						noBottomSpacing
						label='Slider control'
						subtitle='Subtitle'
						icon={icons.emptyCircle}
						actions={<div className='es-h-spaced es-gap-1!'>{icons.emptyRect}{icons.emptyRect}</div>}
						value={value}
						onChange={(value) => setValue(value)}
					/>
				</SingleItemShowcase>

				<SingleItemShowcase title='No offset handle'>
					<ColumnConfigSlider
						noBottomSpacing
						label='Slider control'
						subtitle='Subtitle'
						icon={icons.emptyCircle}
						actions={<div className='es-h-spaced es-gap-1!'>{icons.emptyRect}{icons.emptyRect}</div>}
						value={value}
						onChange={(value) => setValue(value)}
						noOffsetHandle
					/>
				</SingleItemShowcase>

				<SingleItemShowcase title='No width handle'>
					<ColumnConfigSlider
						noBottomSpacing
						label='Slider control'
						subtitle='Subtitle'
						icon={icons.emptyCircle}
						actions={<div className='es-h-spaced es-gap-1!'>{icons.emptyRect}{icons.emptyRect}</div>}
						value={value}
						onChange={(value) => setValue(value)}
						noWidthHandle
					/>
				</SingleItemShowcase>

				<SingleItemShowcase title='No handles'>
					<ColumnConfigSlider
						noBottomSpacing
						label='Slider control'
						subtitle='Subtitle'
						icon={icons.emptyCircle}
						actions={<div className='es-h-spaced es-gap-1!'>{icons.emptyRect}{icons.emptyRect}</div>}
						value={value}
						onChange={(value) => setValue(value)}
						noOffsetHandle
						noWidthHandle
					/>
				</SingleItemShowcase>
			</div>
		</>
	);
};
