import React, { useState } from 'react';
import { AdvancedColorPicker } from '../advanced-color-picker';
import { SingleItemShowcase } from '../../../storybook/helpers';

export default {
	title: 'Options/AdvancedColorPicker',
};

const stubGlobalManifest = {
	globalVariables: {
		colors: [
			{
				name: "Primary",
				slug: "primary",
				color: "#9973E3"
			},
			{
				name: "Black",
				slug: "black",
				color: "#000000"
			},
			{
				name: "Light",
				slug: "light",
				color: "#CCCCCC"
			}
		],
		gradients: [
			{
				name: "Gradient 1",
				slug: "gradient-1",
				gradient: "linear-gradient(90deg, #AB40FF 0%, #5D2BFF 100%)"
			}
		]
	}
};



export const component = () => {
	const [type, setType] = useState('project');
	const [solidColor, setSolidColor] = useState(undefined);
	const [gradient, setGradient] = useState(undefined);
	const [projectColor, setProjectColor] = useState(undefined);

	const { globalVariables: { colors } } = stubGlobalManifest;

	const styleColors = colors.reduce((all, { slug, color }) => ({
		...all,
		[`--global-colors-${slug}`]: color,
	}), {});

	return (
		<div style={styleColors}>
			<h1 className='es-mt-0 es-mb-5 es-p-0 es-text-8'>Advanced color picker</h1>

			<div className='es-display-flex es-flex-wrap es-gap-5!'>
				<SingleItemShowcase title='Basic control'>
					<AdvancedColorPicker
						type={type}
						colorProject={projectColor}
						colorSolid={solidColor}
						colorGradient={gradient}
						onChangeProject={(value) => {
							setProjectColor(value);
							setSolidColor(undefined);
							setGradient(undefined);
						}}
						onChangeSolid={(value) => {
							setProjectColor(undefined);
							setSolidColor(value);
							setGradient(undefined);
						}}
						onChangeGradient={(value) => {
							setProjectColor(undefined);
							setSolidColor(undefined);
							setGradient(value);
						}}
						onChangeType={(value) => setType(value)}
						globalManifest={stubGlobalManifest}
						noBottomSpacing
					/>
				</SingleItemShowcase>

				<SingleItemShowcase title='Tile button'>
					<AdvancedColorPicker
						type={type}
						colorProject={projectColor}
						colorSolid={solidColor}
						colorGradient={gradient}
						onChangeProject={(value) => {
							setProjectColor(value);
							setSolidColor(undefined);
							setGradient(undefined);
						}}
						onChangeSolid={(value) => {
							setProjectColor(undefined);
							setSolidColor(value);
							setGradient(undefined);
						}}
						onChangeGradient={(value) => {
							setProjectColor(undefined);
							setSolidColor(undefined);
							setGradient(value);
						}}
						onChangeType={(value) => setType(value)}
						globalManifest={stubGlobalManifest}
						isTileButton
					/>
				</SingleItemShowcase>
			</div>
		</div>
	);
};
