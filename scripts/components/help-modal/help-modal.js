import React from 'react';
import { Fragment, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { Button, Modal } from '@wordpress/components';
import { helperMessages } from './data';

export const HelpModal = (props) => {
	const {
		buttonLabel = __('How to use wrapper?', 'eightshift-frontend-libs'),
		modalLabel = __('Block Layout', 'eightshift-frontend-libs'),

		type = 'wrapper',
	} = props;

	const [isOpen, activeModal] = useState(false);

	
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
			<Button className={'custom-full-width-button'} isDefault isSmall onClick={() => activeModal(true)}>
				{buttonLabel}
			</Button>
			{isOpen && (
				<Modal
					title={modalLabel}
					onRequestClose={() => activeModal(false)}
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
