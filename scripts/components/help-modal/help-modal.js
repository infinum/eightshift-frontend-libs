import React from 'react'; // eslint-disable-line no-unused-vars
import { Fragment, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { Button, Modal } from '@wordpress/components';

export const HelpModal = (props) => {
	const {
		buttonLabel = __('How to use wrapper?', 'eightshift-boilerplate'),
		modalLabel = __('Block Layout', 'eightshift-boilerplate'),
		children = [],

		type = 'wrapper',

		showWrapperToggle = true,
		showWrapperSimpleToggle = true,
		showWrapperId = true,
		showWrapperAnchorId = true,
		showWrapperBackgroundColor = true,
		showWrapperWidth = true,
		showWrapperOffset = true,
		showWrapperContainerWidth = true,
		showWrapperGutter = true,
		showWrapperSpacingTop = true,
		showWrapperSpacingBottom = true,
		showWrapperSpacingTopIn = true,
		showWrapperSpacingBottomIn = true,
		showWrapperDividerTop = true,
		showWrapperDividerBottom = true,
		showWrapperHide = true,

		showColumnsGutter = true,
		showColumnsVerticalSpacing = true,

		showColumnWidth = true,
		showColumnOffset = true,
		showColumnOrder = true,
		showColumnHide = true,
	} = props;

	const [isOpen, activeModal] = useState(false);

	const Item = (item) => {
		const {
			title,
			content,

			showDivider = true,
		} = item;

		return (
			<Fragment>
				{title &&
					<h4>{title}</h4>
				}

				{content &&
					<p>{content}</p>
				}

				{showDivider &&
					<div className={'custom-divider'}></div>
				}
			</Fragment>
		);
	};

	return (
		<Fragment>
			<Button className={'custom-full-width-button'} isDefault isSmall onClick={() => activeModal(true)}>
				{buttonLabel}
			</Button>
			{isOpen && (
				<Modal
					title={modalLabel}
					onRequestClose={() => activeModal(false)}
				>
					<Fragment>
						{type === 'wrapper' &&
							<Fragment>
								{showWrapperToggle &&
									<Item
										title={__('Wrapper show Toggle', 'eightshift-boilerplate')}
										content={__('', 'eightshift-boilerplate')}
									/>
								}
		
								{showWrapperSimpleToggle &&
									<Item
										title={__('Wrapper Simple Toggle', 'eightshift-boilerplate')}
										content={__('', 'eightshift-boilerplate')}
									/>
								}
		
								{showWrapperId &&
									<Item
										title={__('Block ID', 'eightshift-boilerplate')}
										content={__('Add Unique ID to the block.', 'eightshift-boilerplate')}
									/>
								}
		
								{showWrapperWidth &&
									<Item
										title={__('Content Width', 'eightshift-boilerplate')}
										content={__('Option to change the block width in the grid from the left. Change column width in 12 columns range. Example: 6 is 50 percent of the screen width. If you set a value to -1 it will not be used and the parent breakpoint will be used.', 'eightshift-boilerplate')}
									/>
								}
		
								{showWrapperOffset &&
									<Item
										title={__('Content Offset', 'eightshift-boilerplate')}
										content={__('Option to change the block offset in the grid from the left. Change block offset in 12 columns range. Example: 6 is 50 percent of the screen width. If you set a value to -1 it will not be used and the parent breakpoint will be used.', 'eightshift-boilerplate')}
									/>
								}
		
								{showWrapperContainerWidth &&
									<Item
										title={__('Container Width', 'eightshift-boilerplate')}
										content={__('Change Container width. Changing this option will affect total width of the block and the total size of grid inside the block.', 'eightshift-boilerplate')}
									/>
								}
		
								{showWrapperGutter &&
									<Item
										title={__('Container Spacing', 'eightshift-boilerplate')}
										content={__('Change Container spacing on the left and right. More popular name is Container Gutter.', 'eightshift-boilerplate')}
									/>
								}
		
								{showWrapperSpacingTop &&
									<Item
										title={__('Spacing Top', 'eightshift-boilerplate')}
										content={__('Change Block Spacing from the top. If you set a value to -10 it will not be used and the parent brakepoint will be used.', 'eightshift-boilerplate')}
									/>
								}
		
								{showWrapperSpacingBottom &&
									<Item
										title={__('Spacing Bottom', 'eightshift-boilerplate')}
										content={__('Change Block Spacing from the bottom. If you set a value to -10 it will not be used and the parent brakepoint will be used.', 'eightshift-boilerplate')}
									/>
								}
		
								{showWrapperSpacingTopIn &&
									<Item
										title={__('Spacing Top In', 'eightshift-boilerplate')}
										content={__('Change Block Spacing from the top. If you set a value to -10 it will not be used and the parent brakepoint will be used.', 'eightshift-boilerplate')}
									/>
								}
		
								{showWrapperSpacingBottomIn &&
									<Item
										title={__('Spacing Bottom In', 'eightshift-boilerplate')}
										content={__('Change Block Spacing from the bottom. If you set a value to -10 it will not be used and the parent brakepoint will be used.', 'eightshift-boilerplate')}
									/>
								}
								
								{showWrapperDividerTop &&
									<Item
										title={__('Divider Top', 'eightshift-boilerplate')}
										content={''}
									/>
								}
		
								{showWrapperDividerBottom &&
									<Item
										title={__('Divider Bottom', 'eightshift-boilerplate')}
										content={''}
									/>
								}
		
								{showWrapperHide &&
									<Item
										title={__('Hide Block', 'eightshift-boilerplate')}
										content={__('Toggle block visibility.', 'eightshift-boilerplate')}
									/>
								}

								{showWrapperAnchorId &&
									<Item
										title={__('Anchor ID', 'eightshift-boilerplate')}
										content={__('', 'eightshift-boilerplate')}
									/>
								}

								{showWrapperBackgroundColor &&
									<Item
										title={__('Background Color', 'eightshift-boilerplate')}
										content={__('', 'eightshift-boilerplate')}
									/>
								}
							</Fragment>
						}

						{type === 'columns' &&
							<Fragment>
								{showColumnsGutter &&
									<Item
										title={__('Gutter', 'eightshift-boilerplate')}
										content={__('', 'eightshift-boilerplate')}
									/>
								}

								{showColumnsVerticalSpacing &&
									<Item
										title={__('VerticalSpacing', 'eightshift-boilerplate')}
										content={__('', 'eightshift-boilerplate')}
									/>
								}
							</Fragment>
						}

						{type === 'column' &&
							<Fragment>
								{showColumnWidth &&
									<Item
										title={__('Width', 'eightshift-boilerplate')}
										content={__('', 'eightshift-boilerplate')}
									/>
								}

								{showColumnOffset &&
									<Item
										title={__('Offset', 'eightshift-boilerplate')}
										content={__('', 'eightshift-boilerplate')}
									/>
								}

								{showColumnOrder &&
									<Item
										title={__('Order', 'eightshift-boilerplate')}
										content={__('', 'eightshift-boilerplate')}
									/>
								}

								{showColumnHide &&
									<Item
										title={__('Hide', 'eightshift-boilerplate')}
										content={__('', 'eightshift-boilerplate')}
									/>
								}
							</Fragment>
						}

						{children.map((item, index) => {
							const {
								title,
								content,
							} = item;
	
							return (
								<Fragment key={index}>
									<Item
										title={title}
										content={content}
									/>
								</Fragment>
							);
						})}
					</Fragment>
				</Modal>
			)}
		</Fragment>
	);
};
