/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { jsx } from '@emotion/react';
import { Fragment } from '@wordpress/element';
import manifest from './manifest.json';

export default {
	title: `Global`,
};

export const colors = () => {

	const Color = (props) => {
		const {
			label,
			color
		} = props;

		return (
			<div style={{
				color: '#111111',
				fontSize: '13px',
				textTransform: 'uppercase',
				fontWeight: 'bold'
			}}>
				<div style={{
					backgroundColor: color,
					textAlign: 'center',
					height: '50px',
					marginBottom: '10px',
				}} />

				{label}

				<div style={{
					color: '#525E6C',
					fontSize: '13px',
					marginTop: '5px'
				}}>
					{color}
				</div>
			</div>
		);
	};

	return (
		<>
			<div style={{
				display: 'grid',
				gridGap: '10px',
				marginBottom: '80px',
				gridTemplateColumns: 'repeat(3, 1fr)'
			}}>
				{manifest.globalVariables.colors.map((value) => (
					<Fragment key={value.slug}>
						<Color
							label={value.name}
							color={value.color}
						/>
					</Fragment>
				))}
			</div>
		</>
	);
};
