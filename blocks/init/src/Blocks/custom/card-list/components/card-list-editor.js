import React from 'react'; // eslint-disable-line no-unused-vars
import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';
import { ButtonEditor } from '../../../components/button/components/button-editor';
import { ImageEditor } from '../../../components/image/components/image-editor';

export const CardListEditor = ({ attributes, actions }) => {
	const {
		blockClass,
		heading,
		paragraph,
		mediaPosition,
	} = attributes;

	const {
		onChangeHeading,
		onChangeParagraph,
	} = actions;

	return (
		<div className={classnames(blockClass, `${blockClass}__media-position--${mediaPosition}`)}>
			<div className={`${blockClass}__media`}>
				<ImageEditor
					{...attributes}
					{...actions}
				/>
			</div>
			<div className={`${blockClass}__content`}>
				<div className={`${blockClass}__heading`}>
					<RichText
						placeholder={__('Add your heading', 'eightshift-boilerplate')}
						onChange={onChangeHeading}
						value={heading}
					/>
				</div>
				<div className={`${blockClass}__paragraph`}>
					<RichText
						placeholder={__('Add your paragraph', 'eightshift-boilerplate')}
						onChange={onChangeParagraph}
						value={paragraph}
					/>
				</div>
				<ButtonEditor
					{...attributes}
					{...actions}
				/>
			</div>
		</div>
	);
};
