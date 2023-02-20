import React, { useState } from 'react';
import readme from './readme.mdx';
import { MatrixAlignControl } from '../matrix-align-control';
import { SingleItemShowcase } from '../../../storybook/helpers';

export default {
	title: 'Options/MatrixAlignControl',
	parameters: {
		docs: {
			page: readme
		}
	},
};


export const component = () => {
	const [align, setAlign] = useState('center center');
	const [align2, setAlign2] = useState('center center');
	const [align3, setAlign3] = useState('top left');
	const [align4, setAlign4] = useState('top left');
	return (
		<>
			<h1 className='es-mt-0 es-mb-5 es-p-0 es-text-8'>Align control</h1>

			<div className='es-display-flex es-flex-wrap es-gap-5!'>
				<SingleItemShowcase title='3x3 inline button' demoContainerClass='es-h-center'>
					<MatrixAlignControl
						label='Alignment position'
						value={align}
						onChange={(value) => setAlign(value)}
					/>
				</SingleItemShowcase>

				<SingleItemShowcase title='2x2 inline button' demoContainerClass='es-h-center'>
					<MatrixAlignControl
						label='Alignment position'
						value={align4}
						onChange={(value) => setAlign4(value)}
						size='2x2'
					/>
				</SingleItemShowcase>

				<SingleItemShowcase title='3x3 tile button' demoContainerClass='es-h-center'>
					<MatrixAlignControl
						label='Position'
						value={align2}
						onChange={(value) => setAlign2(value)}
						type='tileButton'
					/>
				</SingleItemShowcase>

				<SingleItemShowcase title='2x2 tile button' demoContainerClass='es-h-center'>
					<MatrixAlignControl
						label='Position'
						value={align3}
						onChange={(value) => setAlign3(value)}
						type='tileButton'
						size='2x2'
					/>
				</SingleItemShowcase>
			</div>
		</>
	);
};
