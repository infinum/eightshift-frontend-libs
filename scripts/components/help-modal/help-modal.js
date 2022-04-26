import React from 'react';
import { Fragment, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { Button, Modal } from '@wordpress/components';
import { helperMessages } from './data';
import { icons } from '../../../scripts';

/**
 * A modal dialog for displaying help about component's options.
 * 
 * @param {object} props                - HelpModal options.
 * @param {string} props.buttonLabel    - Text to display on the button that opens the dialog.
 * @param {string} props.modalLabel     - Title of the modal.
 * @param {string} [props.type=wrapper] - Determines if the type and content of the modal.
 */
export const HelpModal = (props) => {
	const {
		buttonLabel = __('How to use wrapper?', 'eightshift-frontend-libs'),
		modalLabel = __('Block Layout', 'eightshift-frontend-libs'),

		type = 'wrapper',
	} = props;

	const [isOpen, setIsOpen] = useState(false);

	
	const Item = (item) => {
		const {
			icon,
			title,
			description,
		} = item;

		return (
			<div className="help-item-flex">
				{icon}

				<div className="help-item-flex-col">
					{title &&
						<h4>{__(title, 'eightshift-frontend-libs')}</h4>
					}

					{description &&
						<p dangerouslySetInnerHTML={{__html: __(description, 'eightshift-frontend-libs')}}></p>
					}
				</div>
			</div>
		);
	};

	return (
		<Fragment>
			<Button
				icon={icons.help}
				label={buttonLabel}
				className='es-help-button'
				onClick={() => setIsOpen(true)} 
				isTertiary
				iconSize={24}
			>
				{buttonLabel}
			</Button>

			{isOpen && (
				<Modal
					title={modalLabel}
					onRequestClose={() => setIsOpen(false)}
				>
					<Fragment>
						{helperMessages[type] && helperMessages[type].map((item, index) => {
							return ( item.show &&
								<Fragment key={index}>
									<Item {...item} />
								</Fragment>
							);
						})}
					</Fragment>
				</Modal>
			)}
		</Fragment>
	);
};
