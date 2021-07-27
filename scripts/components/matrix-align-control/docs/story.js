import React, { useState } from 'react';
import readme from './readme.mdx';
import { MatrixAlignControl } from '../matrix-align-control';

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

	return (
		<MatrixAlignControl
		label='Alignment position'
		value={align}
		onChange={(value) => setAlign(value)}
	/>
	);
}
