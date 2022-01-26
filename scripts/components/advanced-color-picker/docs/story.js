import React, { useState } from 'react';
import readme from './readme.mdx';
import { AdvancedColorPicker } from '../advanced-color-picker';

export default {
	title: `Options/AdvancedColorPicker`,
	parameters: {
		docs: {
			page: readme
		}
	},
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

	const extractedProjectColor = colors.find(({ slug }) => slug === projectColor);

	return (
		<>
			<div style={{
				width: '3rem',
				height: '3rem',
				padding: '1rem',
				boxShadow: 'inset 0 0 0 1px #FFFFFF, 0 0 0 1px #F0F0F0',
				background: type === '' ? 'transparent' : (type === 'project' ? extractedProjectColor?.color : (type === 'solid' ? solidColor?.hex : gradient)), // eslint-disable-line no-nested-ternary
				borderRadius: '6rem',
				margin: '0 0 1rem 8.5rem'
			}}></div>

			<div style={{
				width: '20rem',
				padding: '1rem',
				border: '1px solid #F0F0F0',
				borderRadius: '6px',
			}}>
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
				/>
			</div>
		</>
	);
};
