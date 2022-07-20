/** @jsx jsx */
import { jsx } from '@emotion/core';
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
			<div css={{
				color: '#111111',
				fontSize: '13px',
				textTransform: 'uppercase',
				fontWeight: 'bold'
			}}>
				<div css={{
					backgroundColor: color,
					textAlign: 'center',
					height: '50px',
					marginBottom: '10px',
				}}></div>
					{label}
					<div css={{
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
			<div css={{
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
