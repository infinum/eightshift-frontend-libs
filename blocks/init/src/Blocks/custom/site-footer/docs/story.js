import React from 'react';
import manifest from './../manifest.json';
import { Gutenberg } from '../../../../../../../.storybook/assets';

export default {
	title: 'Blocks/Site Footer',
};

export const block = () => <Gutenberg manifest={manifest} additionalDescription={'A block to use as a footer. You will need to implement a reusable block option and render it inside footer.php.'}/>;
