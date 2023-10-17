import React from 'react';
import { Menu, MenuItem, MenuSeparator, icons } from '@eightshift/frontend-libs/scripts';
import readme from './readme.mdx';
import { SingleItemShowcase } from '../../../storybook/helpers';

export default {
	title: 'Options/Menu',
	parameters: {
		docs: {
			page: readme
		}
	},
};

export const component = () => {
	return (
		<>
			<h1 className='es-mt-0 es-mb-5 es-p-0 es-text-8'>Menu</h1>

			<div className='es-display-flex es-flex-wrap es-gap-5!'>
				<SingleItemShowcase title='Simple menu'>
					<div className='es-h-spaced'>
						<Menu label='File'>
							<MenuItem label='New text file' onClick={() => console.log('"New text file" clicked')} />
							<MenuItem label='New file...' onClick={() => console.log('"New file..." clicked')} />
							<MenuItem label='New window' onClick={() => console.log('"New window" clicked')} />
							<MenuSeparator />
							<MenuItem label='Open...' onClick={() => console.log('"Open..." clicked')} />
							<MenuItem label='Open folder' onClick={() => console.log('"Open folder" clicked')} />
							<MenuItem label='Open workspace from file' onClick={() => console.log('"Open workspace from file" clicked')} />
							<MenuSeparator />
							<MenuItem label='Save' onClick={() => console.log('"Save" clicked')} />
							<MenuItem label='Save as...' onClick={() => console.log('"Save as..." clicked')} />
							<MenuItem label='Save all' onClick={() => console.log('"Save all" clicked')} />
						</Menu>

						<Menu label='Edit'>
							<MenuItem icon={icons.dummySpacer} label='Disabled item' disabled />
							<MenuItem icon={icons.componentGeneric} label='Disabled item with icon' disabled />
							<MenuSeparator />
							<MenuItem icon={icons.componentGeneric} label='Lorem' onClick={() => console.log('"Lorem" clicked')} />
							<MenuItem icon={icons.componentGeneric} label='Ipsum' onClick={() => console.log('"Ipsum" clicked')} />
							<MenuItem icon={icons.componentGeneric} label='Dolor' onClick={() => console.log('"Dolor" clicked')} />
							<MenuItem icon={icons.componentGeneric} label='Sit amet...' onClick={() => console.log('"Sit amet..." clicked')} />
						</Menu>
					</div>
				</SingleItemShowcase>
			</div>
		</>
	);
};
