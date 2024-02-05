import React, { useState } from 'react';
import { Section } from '../section';
import { icons } from '@eightshift/frontend-libs/scripts';

export default {
	title: 'Options/Section',
};

export const simpleDivider = () => {
	const [visible, setVisible] = useState(true);

	return (
		<div style={{ maxWidth: '20rem' }}>
			<h4>Regular</h4>
			<Section label='Divider'>
				<p>Content inside the section</p>
			</Section>
			<br />

			<h4>With subtitle</h4>
			<Section label='Divider' subtitle='I divide'>
				<p>Content inside the section</p>
			</Section>
			<br />

			<h4>With icon</h4>
			<Section label='Divider' icon={icons.iconGeneric}>
				<p>Content inside the section</p>
			</Section>
			<br />

			<h4>With icon and subtitle</h4>
			<Section label='Divider' icon={icons.iconGeneric} subtitle='I divide'>
				<p>Content inside the section</p>
			</Section>
			<br />

			<h4>Collapsable section (<code>collapsable</code>)</h4>
			<Section label='Divider' icon={icons.iconGeneric} collapsable>
				<p>Content inside the section</p>
			</Section>

			<h4>Conditionally rendered (with <code>showIf</code>)</h4>

			<label>
				<input checked={visible} onChange={(e) => setVisible(e.currentTarget.checked)} type='checkbox' />
				<span style={{ paddingLeft: '0.5rem' }}>Visible</span>
			</label>
			<br />

			<Section showIf={visible} label='Divider' icon={icons.iconGeneric}>
				<p>Content inside the section</p>
			</Section>
		</div>
	);
};
