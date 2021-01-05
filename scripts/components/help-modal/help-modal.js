import React from 'react';
import { Fragment, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { Button, Modal } from '@wordpress/components';

export const HelpModal = (props) => {
	const {
		buttonLabel = __('How to use wrapper?', 'eightshift-frontend-libs'),
		modalLabel = __('Block Layout', 'eightshift-frontend-libs'),
		children = [],

		type = 'wrapper',

		wrapperUseShow = true,
		wrapperUseSimpleShow = true,
		showWrapperIdShow = true,
		wrapperAnchorIdShow = true,
		wrapperBackgroundColorShow = true,
		wrapperWidthShow = true,
		wrapperOffsetShow = true,
		wrapperContainerWidthShow = true,
		wrapperGutterShow = true,
		wrapperSpacingTopShow = true,
		wrapperSpacingBottomShow = true,
		wrapperSpacingTopInShow = true,
		wrapperSpacingBottomInShow = true,
		wrapperDividerTopShow = true,
		wrapperDividerBottomShow = true,
		wrapperHideShow = true,

		columnsGutterShow = true,
		columnsVerticalSpacingShow = true,

		columnWidthShow = true,
		columnOffsetShow = true,
		columnOrderShow = true,
		columnHideShow = true,
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
								{wrapperUseShow &&
									<Item
										title={__('Wrapper Enabled', 'eightshift-frontend-libs')}
										content={__('This toogle is used to enable od disable wrapper alltogether.', 'eightshift-frontend-libs')}
									/>
								}
		
								{wrapperUseSimpleShow &&
									<Item
										title={__('Wrapper Simple Toggle', 'eightshift-frontend-libs')}
										content={__('This toogle is used to enable od disable simple wrapper. Generally simple wrapper is used inside inner blocks to provide only simple layouting options like spacing, divider and etc.', 'eightshift-frontend-libs')}
									/>
								}

								{wrapperSpacingTopShow &&
									<Item
										title={__('Spacing Top', 'eightshift-frontend-libs')}
										content={__('Adds block spacing from the top. This value is defined as marging so if you use background color on the wrapper it will add spacing over the background color.', 'eightshift-frontend-libs')}
									/>
								}
		
								{wrapperSpacingBottomShow &&
									<Item
										title={__('Spacing Bottom', 'eightshift-frontend-libs')}
										content={__('Adds block spacing from the bottom. This value is defined as marging so if you use background color on the wrapper it will add spacing over the background color.', 'eightshift-frontend-libs')}
									/>
								}
		
								{wrapperSpacingTopInShow &&
									<Item
										title={__('Spacing Top In', 'eightshift-frontend-libs')}
										content={__('Adds block spacing from the top. This value is defined as padding so if you use background color on the wrapper it will add spacing inside the background color.', 'eightshift-frontend-libs')}
									/>
								}
		
								{wrapperSpacingBottomInShow &&
									<Item
										title={__('Spacing Bottom In', 'eightshift-frontend-libs')}
										content={__('Adds block spacing from the bottom. This value is defined as padding so if you use background color on the wrapper it will add spacing inside the background color.', 'eightshift-frontend-libs')}
									/>
								}

								{wrapperDividerTopShow &&
									<Item
										title={__('Divider Top', 'eightshift-frontend-libs')}
										content={__('Adds simple divider on the top of the wrapper.', 'eightshift-frontend-libs')}
									/>
								}
		
								{wrapperDividerBottomShow &&
									<Item
										title={__('Divider Bottom', 'eightshift-frontend-libs')}
										content={__('Adds simple divider on the bottom of the wrapper.', 'eightshift-frontend-libs')}
									/>
								}
		
								{wrapperHideShow &&
									<Item
										title={__('Hide Block', 'eightshift-frontend-libs')}
										content={__('Toggles block visibility.', 'eightshift-frontend-libs')}
									/>
								}

								{wrapperWidthShow &&
									<Item
										title={__('Content Width', 'eightshift-frontend-libs')}
										content={__('Option to change the block width in the grid from the left. Change column width in 12 columns range. Example: value 6 is 50 percent of the screen width.', 'eightshift-frontend-libs')}
									/>
								}
		
								{wrapperOffsetShow &&
									<Item
										title={__('Content Offset', 'eightshift-frontend-libs')}
										content={__('Option to change the block offset in the grid from the left. Change block offset in 12 columns range. Example: value 6 is 50 percent of the screen width.', 'eightshift-frontend-libs')}
									/>
								}
		
								{wrapperContainerWidthShow &&
									<Item
										title={__('Container Width', 'eightshift-frontend-libs')}
										content={__('Option to change container width. Changing this option will affect total width of the block and the total size of grid inside the block.', 'eightshift-frontend-libs')}
									/>
								}
		
								{wrapperGutterShow &&
									<Item
										title={__('Gutter', 'eightshift-frontend-libs')}
										content={__('Option to change gutter on the left and right. More popular name is container gutter.', 'eightshift-frontend-libs')}
									/>
								}

								{wrapperBackgroundColorShow &&
									<Item
										title={__('Background Color', 'eightshift-frontend-libs')}
										content={__('Option to change wrappers background color.', 'eightshift-frontend-libs')}
									/>
								}

								{wrapperAnchorIdShow &&
									<Item
										title={__('Anchor ID', 'eightshift-frontend-libs')}
										content={__('Option to add custom anchor it tag that you can use with and scroll to anchor option.', 'eightshift-frontend-libs')}
									/>
								}

								{showWrapperIdShow &&
									<Item
										title={__('Block ID', 'eightshift-frontend-libs')}
										content={__('Add Unique ID to the block, generaly used for some specifig identifier.', 'eightshift-frontend-libs')}
									/>
								}

							</Fragment>
						}

						{type === 'columns' &&
							<Fragment>
								{columnsGutterShow &&
									<Item
										title={__('Gutter', 'eightshift-frontend-libs')}
										content={__('Option to change gutter on the left and right. More popular name is container gutter.', 'eightshift-frontend-libs')}
									/>
								}

								{columnsVerticalSpacingShow &&
									<Item
										title={__('Vertical Spacing', 'eightshift-frontend-libs')}
										content={__('Option to define verital spacing for all the column items inside by adding margin on the bottom.', 'eightshift-frontend-libs')}
									/>
								}
							</Fragment>
						}

						{type === 'column' &&
							<Fragment>
								{columnWidthShow &&
									<Item
										title={__('Width', 'eightshift-frontend-libs')}
										content={__('Option to change the column width in the grid from the left. Change column width in 12 columns range. Example: value 6 is 50 percent of the screen width.', 'eightshift-frontend-libs')}
									/>
								}

								{columnOffsetShow &&
									<Item
										title={__('Offset', 'eightshift-frontend-libs')}
										content={__('Option to change the column offset in the grid from the left. Change block offset in 12 columns range. Example: value 6 is 50 percent of the screen width.', 'eightshift-frontend-libs')}
									/>
								}

								{columnOrderShow &&
									<Item
										title={__('Order', 'eightshift-frontend-libs')}
										content={__('Option to change the column order based on the number provided. If you add order to any of the column items you must provide order to the rest of them, otherwise it wont work.', 'eightshift-frontend-libs')}
									/>
								}

								{columnHideShow &&
									<Item
										title={__('Hide', 'eightshift-frontend-libs')}
										content={__('Toggles column visibility.', 'eightshift-frontend-libs')}
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
