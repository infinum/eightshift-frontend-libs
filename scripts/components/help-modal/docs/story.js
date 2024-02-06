import React from 'react';
import { HelpModal } from '../help-modal';
import { SingleItemShowcase } from '../../../storybook/helpers';

export default {
	title: 'Options/HelpModal',
};

const props = {};

export const component = () => (
	<>
		<h1 className='es-mt-0 es-mb-5 es-p-0 es-text-8'>Help modal</h1>

		<div className='es-display-flex es-flex-wrap es-gap-5!'>
			<SingleItemShowcase title='Basic control'>
				<HelpModal
					{...props}
				/>
			</SingleItemShowcase>

		</div>
	</>
);
