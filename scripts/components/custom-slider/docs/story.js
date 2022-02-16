import React, { useState } from 'react';
import readme from './readme.mdx';
import { Button } from '@wordpress/components';
import { CustomSlider } from '../custom-slider';
import { CustomRangeSlider, CustomRangeSliderStyle } from '../custom-range-slider';
import { icons } from '../../..';

export default {
	title: 'Options/CustomSlider',
	parameters: {
		docs: {
			page: readme
		}
	},
};

const baseSliderProps = {
	min: 1,
	max: 10,
};

const baseMarks = {
	1: 1,
	2: 2,
	3: 3,
	4: 4,
	5: 5,
	6: 6,
	7: 7,
	8: 8,
	9: 9,
	10: 10,
};

const columnPickerMarks = {
	1: 1,
	2: 2,
	3: 3,
	4: 4,
	5: 5,
	6: 6,
	7: 7,
	8: 8,
	9: 9,
};

const reducedMarks = {
	1: 1,
	3: 3,
	5: 5,
	7: 7,
	9: 9,
};

const SliderContainer = (props) => (
	<div style={{
		maxWidth: '16.5rem',
		'--wp-admin-theme-color': 'rgb(56, 88, 233)',
	}}>
		{props.children}
	</div>
);

export const basicSlider = () => {
	const [value, setValue] = useState(5);

	return (
		<SliderContainer>
			<CustomSlider
				{...baseSliderProps}
				value={value}
				label='Basic slider'
				onChange={(value) => setValue(value)}
			/>
		</SliderContainer>
	);
};

export const basicSliderWithMarks = () => {
	const [value, setValue] = useState(5);

	return (
		<SliderContainer>
			<CustomSlider
				{...baseSliderProps}
				value={value}
				label='Basic slider with marks'
				onChange={(value) => setValue(value)}
				marks={baseMarks}
			/>
		</SliderContainer>
	);
};

export const basicSliderWithCompactMarks = () => {
	const [value, setValue] = useState(5);

	return (
		<SliderContainer>
			<CustomSlider
				{...baseSliderProps}
				value={value}
				label='Basic slider with compact marks'
				onChange={(value) => setValue(value)}
				marks={baseMarks}
				hasCompactMarks
			/>
		</SliderContainer>
	);
};

export const basicSliderWithVerticalMarks = () => {
	const [value, setValue] = useState(5);

	return (
		<SliderContainer>
			<CustomSlider
				{...baseSliderProps}
				value={value}
				label='Basic slider with vertical marks'
				onChange={(value) => setValue(value)}
				marks={baseMarks}
				hasVerticalLabels
			/>
		</SliderContainer>
	);
};

export const basicSliderWithLeftAddition = () => {
	const [value, setValue] = useState(5);

	return (
		<>
			<SliderContainer>
				<CustomSlider
					{...baseSliderProps}
					value={value}
					label='Basic slider with left addition'
					onChange={(value) => setValue(value)}
					leftAddition={icons.arrowLeft}
				/>
			</SliderContainer>

			<br />

			<SliderContainer>
				<CustomSlider
					{...baseSliderProps}
					value={value}
					onChange={(value) => setValue(value)}
					leftAddition={<span>Hi</span>}
				/>
			</SliderContainer>

			<br />

			<SliderContainer>
				<CustomSlider
					{...baseSliderProps}
					value={value}
					onChange={(value) => setValue(value)}
					leftAddition={<Button isSecondary isSmall onClick={() => setValue(1)}>Reset</Button>}
				/>
			</SliderContainer>
		</>
	);
};

export const basicSliderWithRightAddition = () => {
	const [value, setValue] = useState(5);

	return (
		<SliderContainer>
			<CustomSlider
				{...baseSliderProps}
				value={value}
				label='Basic slider with right addition'
				onChange={(value) => setValue(value)}
				rightAddition={icons.arrowRight}
			/>
		</SliderContainer>
	);
};

export const basicSliderWithLeftAndRightAddition = () => {
	const [value, setValue] = useState(5);

	return (
		<SliderContainer>
			<CustomSlider
				{...baseSliderProps}
				value={value}
				label='Basic slider with left and right addition'
				onChange={(value) => setValue(value)}
				leftAddition={icons.arrowLeft}
				rightAddition={icons.arrowRight}
			/>
		</SliderContainer>
	);
};

export const basicSliderWithValueDisplay = () => {
	const [value, setValue] = useState(5);

	return (
		<SliderContainer>
			<CustomSlider
				{...baseSliderProps}
				value={value}
				label='Basic slider with value display'
				onChange={(value) => setValue(value)}
				hasValueDisplay
			/>
		</SliderContainer>
	);
};

export const basicSliderWithCustomValueDisplay = () => {
	const [value, setValue] = useState(5);

	return (
		<SliderContainer>
			<CustomSlider
				{...baseSliderProps}
				value={value}
				label='Basic slider with custom value display'
				onChange={(value) => setValue(value)}
				hasValueDisplay
				valueDisplayElement={<span style={{ color: 'purple', fontFamily: 'serif', fontWeight: 'bold', fontSize: '1.5rem' }}><small>Value:</small> {value}</span>}
			/>
		</SliderContainer>
	);
};

export const basicSliderWithInputField = () => {
	const [value, setValue] = useState(5);

	return (
		<SliderContainer>
			<CustomSlider
				{...baseSliderProps}
				value={value}
				label='Basic slider with input field'
				onChange={(value) => setValue(value)}
				hasInputField
			/>
		</SliderContainer>
	);
};

export const reversedSlider = () => {
	const [value, setValue] = useState(5);

	return (
		<SliderContainer>
			<CustomSlider
				{...baseSliderProps}
				value={value}
				label='Reversed slider'
				onChange={(value) => setValue(value)}
				reverse
			/>
		</SliderContainer>
	);
};

export const inlineSlider = () => {
	const [value, setValue] = useState(5);

	return (
		<SliderContainer>
			<CustomSlider
				{...baseSliderProps}
				value={value}
				label='Slider'
				onChange={(value) => setValue(value)}
				isInline
			/>
		</SliderContainer>
	);
};

export const inlineSliderWithMarks = () => {
	const [value, setValue] = useState(5);

	return (
		<SliderContainer>
			<CustomSlider
				{...baseSliderProps}
				value={value}
				label='Slider'
				onChange={(value) => setValue(value)}
				marks={baseMarks}
				isInline
			/>
		</SliderContainer>
	);
};

export const inlineSliderWithCompactMarks = () => {
	const [value, setValue] = useState(5);

	return (
		<SliderContainer>
			<CustomSlider
				{...baseSliderProps}
				value={value}
				label='Slider'
				onChange={(value) => setValue(value)}
				marks={baseMarks}
				hasCompactMarks
				isInline
			/>
		</SliderContainer>
	);
};

export const inlineSliderWithValueDisplay = () => {
	const [value, setValue] = useState(5);

	return (
		<SliderContainer>
			<CustomSlider
				{...baseSliderProps}
				value={value}
				label='Slider'
				onChange={(value) => setValue(value)}
				hasValueDisplay
				isInline
			/>
		</SliderContainer>
	);
};

export const disabledSlider = () => {
	const [value, setValue] = useState(5);

	return (
		<SliderContainer>
			<CustomSlider
				{...baseSliderProps}
				value={value}
				label='Disabled slider'
				onChange={(value) => setValue(value)}
				marks={baseMarks}
				hasCompactMarks
				hasInputField
				disabled
			/>
		</SliderContainer>
	);
};

export const sliderWithStep = () => {
	const [value, setValue] = useState(4);

	return (
		<SliderContainer>
			<CustomSlider
				min={0}
				max={10}
				value={value}
				label='Slider with step = 2'
				onChange={(value) => setValue(value)}
				step={2}
			/>
		</SliderContainer>
	);
};

export const sliderWithStepAndDots = () => {
	const [value, setValue] = useState(4);

	return (
		<SliderContainer>
			<CustomSlider
				min={0}
				max={10}
				value={value}
				label='Slider with step = 2 and dots'
				onChange={(value) => setValue(value)}
				step={2}
				dots
			/>
		</SliderContainer>
	);
};

export const sliderWithCustomTrackColor = () => {
	const [value, setValue] = useState(5);

	return (
		<SliderContainer>
			<CustomSlider
				{...baseSliderProps}
				value={value}
				label='Slider with custom track color'
				onChange={(value) => setValue(value)}
				trackColor='red'
			/>
		</SliderContainer>
	);
};

export const sliderWithCustomRailColor = () => {
	const [value, setValue] = useState(5);

	return (
		<SliderContainer>
			<CustomSlider
				{...baseSliderProps}
				value={value}
				label='Slider with custom rail color'
				onChange={(value) => setValue(value)}
				railColor='green'
			/>
		</SliderContainer>
	);
};

export const sliderWithCustomTrackAndRailColor = () => {
	const [value, setValue] = useState(5);

	return (
		<SliderContainer>
			<CustomSlider
				{...baseSliderProps}
				value={value}
				label='Slider with custom track and rail color'
				onChange={(value) => setValue(value)}
				trackColor='red'
				railColor='green'
			/>

			<br />

			<CustomSlider
				{...baseSliderProps}
				value={value}
				onChange={(value) => setValue(value)}
				trackColor='linear-gradient(270deg, yellow, orange)'
				railColor='linear-gradient(90deg, #00DBDE 0%, #FC00FF 100%)'
			/>
		</SliderContainer>
	);
};

export const sliderWithCustomHandleColor = () => {
	const [value, setValue] = useState(5);

	return (
		<SliderContainer>
			<CustomSlider
				{...baseSliderProps}
				value={value}
				label='Slider with custom handle color'
				onChange={(value) => setValue(value)}
				handleColor='linear-gradient(-45deg, red, orange)'
			/>
		</SliderContainer>
	);
};

export const sliderWithCustomMarkColors = () => {
	const [value, setValue] = useState(5);

	return (
		<SliderContainer>
			<CustomSlider
				{...baseSliderProps}
				value={value}
				label='Slider with custom mark colors'
				onChange={(value) => setValue(value)}
				marks={baseMarks}
				activeMarkColor='red'
				inactiveMarkColor='green'
			/>
		</SliderContainer>
	);
};

export const sliderWithCustomMarkTextColors = () => {
	const [value, setValue] = useState(5);

	return (
		<SliderContainer>
			<CustomSlider
				{...baseSliderProps}
				value={value}
				label='Slider with custom mark text colors'
				onChange={(value) => setValue(value)}
				marks={baseMarks}
				activeMarkLabelColor='red'
				inactiveMarkLabelColor='green'
			/>
		</SliderContainer>
	);
};

export const sliderWithFullCustomColors = () => {
	const [value, setValue] = useState(5);

	return (
		<SliderContainer>
			<CustomSlider
				{...baseSliderProps}
				value={value}
				label='Slider with custom mark text colors'
				onChange={(value) => setValue(value)}
				marks={baseMarks}
				trackColor='red'
				railColor='green'
				activeMarkColor='red'
				inactiveMarkColor='green'
				activeMarkLabelColor='red'
				inactiveMarkLabelColor='green'
				handleColor='red'
			/>
		</SliderContainer>
	);
};

export const verticalSlider = () => {
	const [value, setValue] = useState(5);

	return (
		<SliderContainer>
			<CustomSlider
				{...baseSliderProps}
				value={value}
				label='Vertical slider'
				onChange={(value) => setValue(value)}
				vertical
			/>
		</SliderContainer>
	);
};

export const verticalSliderWithMarks = () => {
	const [value, setValue] = useState(5);

	return (
		<SliderContainer>
			<CustomSlider
				{...baseSliderProps}
				max={9}
				value={value}
				label='Vertical slider with marks'
				onChange={(value) => setValue(value)}
				vertical
				marks={reducedMarks}
			/>
		</SliderContainer>
	);
};

export const verticalSliderWithMarksAndAdditions = () => {
	const [value, setValue] = useState(5);

	return (
		<SliderContainer>
			<CustomSlider
				{...baseSliderProps}
				max={9}
				value={value}
				label='Vertical slider with marks and additions'
				onChange={(value) => setValue(value)}
				vertical
				marks={reducedMarks}
				leftAddition={icons.arrowUp}
				rightAddition={icons.arrowDown}
			/>
		</SliderContainer>
	);
};

export const verticalSliderWithValueDisplay = () => {
	const [value, setValue] = useState(5);

	return (
		<SliderContainer>
			<CustomSlider
				{...baseSliderProps}
				max={9}
				value={value}
				label='Vertical slider with value display'
				onChange={(value) => setValue(value)}
				vertical
				hasValueDisplay
			/>
		</SliderContainer>
	);
};

export const verticalSliderWithInputField = () => {
	const [value, setValue] = useState(5);

	return (
		<SliderContainer>
			<CustomSlider
				{...baseSliderProps}
				max={9}
				value={value}
				label='Vertical slider with input field'
				onChange={(value) => setValue(value)}
				vertical
				hasInputField
			/>
		</SliderContainer>
	);
};

export const reverseVerticalSlider = () => {
	const [value, setValue] = useState(5);

	return (
		<SliderContainer>
			<CustomSlider
				{...baseSliderProps}
				max={9}
				value={value}
				label='Reverse vertical slider'
				onChange={(value) => setValue(value)}
				vertical
				reverse
			/>
		</SliderContainer>
	);
};

export const fullyCustomizedVerticalSlider = () => {
	const [value, setValue] = useState(5);

	return (
		<SliderContainer>
			<CustomSlider
				value={value}
				label='Fully customized vertical slider'
				onChange={(value) => setValue(value)}
				min={1}
				max={4}
				vertical
				reverse
				tooltipPlacement='hidden'
				marks={{
					1: 'P',
					2: 'R',
					3: 'N',
					4: 'D',
				}}
				trackColor='transparent'
				railColor='transparent'
				handleColor='#444'
				activeMarkColor='#999'
				inactiveMarkColor='#999'
			/>
		</SliderContainer>
	);
};

export const basicRangeSlider = () => {
	const [value, setValue] = useState([3, 7]);

	return (
		<SliderContainer>
			<CustomRangeSlider
				{...baseSliderProps}
				value={value}
				label='Basic range slider'
				onChange={(value) => setValue(value)}
			/>
		</SliderContainer>
	);
};

export const basicRangeSliderWithMarks = () => {
	const [value, setValue] = useState([3, 7]);

	return (
		<SliderContainer>
			<CustomRangeSlider
				{...baseSliderProps}
				value={value}
				label='Basic range slider with marks'
				onChange={(value) => setValue(value)}
				marks={baseMarks}
			/>
		</SliderContainer>
	);
};

export const basicRangeSliderWithCompactMarks = () => {
	const [value, setValue] = useState([3, 7]);

	return (
		<SliderContainer>
			<CustomRangeSlider
				{...baseSliderProps}
				value={value}
				label='Basic range slider with marks'
				onChange={(value) => setValue(value)}
				marks={baseMarks}
				hasCompactMarks
			/>
		</SliderContainer>
	);
};

export const basicRangeSliderWithValueDisplay = () => {
	const [value, setValue] = useState([3, 7]);

	return (
		<SliderContainer>
			<CustomRangeSlider
				{...baseSliderProps}
				value={value}
				label='Basic range slider with value display'
				onChange={(value) => setValue(value)}
				hasValueDisplay
			/>
		</SliderContainer>
	);
};

export const basicRangeSliderWithInputFields = () => {
	const [value, setValue] = useState([3, 7]);

	return (
		<SliderContainer>
			<CustomRangeSlider
				{...baseSliderProps}
				value={value}
				label='Basic range slider with input fields'
				onChange={(value) => setValue(value)}
				hasInputFields
			/>
		</SliderContainer>
	);
};

export const basicRangeSliderWithDraggableTrack = () => {
	const [value, setValue] = useState([3, 7]);

	return (
		<SliderContainer>
			<CustomRangeSlider
				{...baseSliderProps}
				value={value}
				label='Basic range slider with draggable track'
				onChange={(value) => setValue(value)}
				draggableTrack
			/>
		</SliderContainer>
	);
};

export const rangeSliderWithMultipleRanges = () => {
	const [value, setValue] = useState([3, 5, 7]);

	return (
		<SliderContainer>
			<CustomRangeSlider
				{...baseSliderProps}
				value={value}
				label='Range slider with multiple ranges'
				onChange={(value) => setValue(value)}
			/>
		</SliderContainer>
	);
};

export const rangeSliderWithMultiplePushableRanges = () => {
	const [value, setValue] = useState([3, 5, 7]);

	return (
		<SliderContainer>
			<CustomRangeSlider
				{...baseSliderProps}
				value={value}
				label='Range slider with multiple pushable ranges'
				onChange={(value) => setValue(value)}
				pushable
			/>
		</SliderContainer>
	);
};

export const rangeSliderWithMultiplePushableRangesAndMinDistance = () => {
	const [value, setValue] = useState([3, 5, 7]);

	return (
		<SliderContainer>
			<CustomRangeSlider
				{...baseSliderProps}
				value={value}
				label='Range slider with multiple pushable ranges and min distance between handles'
				onChange={(value) => setValue(value)}
				pushable={2}
			/>
		</SliderContainer>
	);
};

export const rangeSliderWithMultipleNonCrossableRanges = () => {
	const [value, setValue] = useState([3, 5, 7]);

	return (
		<SliderContainer>
			<CustomRangeSlider
				{...baseSliderProps}
				value={value}
				label='Range slider with multiple non-crossable ranges'
				onChange={(value) => setValue(value)}
				allowCross={false}
			/>
		</SliderContainer>
	);
};

export const rangeSliderWithMultiplePushableAndDraggableRanges = () => {
	const [value, setValue] = useState([3, 5, 7]);

	return (
		<SliderContainer>
			<CustomRangeSlider
				{...baseSliderProps}
				value={value}
				label='Range slider with multiple pushable and draggable ranges'
				onChange={(value) => setValue(value)}
				draggableTrack
				pushable
			/>
		</SliderContainer>
	);
};

export const rangeSliderColumnPickerStyle = () => {
	const [value, setValue] = useState([3, 7]);

	return (
		<SliderContainer>
			<CustomRangeSlider
				min={1}
				max={9}
				value={value}
				label='Range slider with "Column picker" style'
				onChange={(value) => setValue(value)}
				pushable
				draggableTrack
				allowCross={false}
				sliderStyle={CustomRangeSliderStyle.COLUMN_PICKER}
			/>
			<br />
			Columns {value[0]} - {value[1]} (width {value[1] - value[0]})
		</SliderContainer>
	);
};

export const rangeSliderColumnPickerStyleWithMarks = () => {
	const [value, setValue] = useState([3, 7]);

	return (
		<SliderContainer>
			<CustomRangeSlider
				min={1}
				max={9}
				value={value}
				label='Range slider with "Column picker" style and marks'
				onChange={(value) => setValue(value)}
				pushable
				draggableTrack
				allowCross={false}
				sliderStyle={CustomRangeSliderStyle.COLUMN_PICKER}
				marks={columnPickerMarks}
			/>
			<br />
			Columns {value[0]} - {value[1]} (width {value[1] - value[0]})
		</SliderContainer>
	);
};

export const rangeSliderColumnPickerStyleWithDotMarks = () => {
	const [value, setValue] = useState([3, 7]);

	return (
		<SliderContainer>
			<CustomRangeSlider
				min={1}
				max={9}
				value={value}
				label='Range slider with "Column picker with dots" style and dot-marks'
				onChange={(value) => setValue(value)}
				pushable
				draggableTrack
				allowCross={false}
				sliderStyle={CustomRangeSliderStyle.COLUMN_PICKER_WITH_DOTS}
				marks={columnPickerMarks}
			/>
			<br />
			Columns {value[0]} - {value[1]} (width {value[1] - value[0]})
		</SliderContainer>
	);
};
