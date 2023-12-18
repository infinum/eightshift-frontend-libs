import React from 'react';
import manifest from '../manifest.json';
import { GetStoryComponentDescription } from '../../../../../../../.storybook/assets';

export default {
	title: 'Components/Tracking Head',
};

export const editor = () => (
	<GetStoryComponentDescription manifest={manifest}>
		<div>{`Component - ${manifest.title} - Please check readme`}</div>
	</GetStoryComponentDescription>
);
