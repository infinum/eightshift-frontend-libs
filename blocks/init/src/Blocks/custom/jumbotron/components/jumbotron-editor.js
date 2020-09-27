import React from 'react'; // eslint-disable-line no-unused-vars
import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';
import { ImageEditor } from '../../../components/image/components/image-editor';

export const JumbotronEditor = ({ attributes, actions }) => {
	const {
		blockClass,
		heading,
		paragraph,
		media,
		contentHorizontalPosition,
		contentVerticalPosition,
		mediaHorizontalPosition,
	} = attributes;

	const {
		onChangeHeading,
		onChangeParagraph,
		onChangeMedia,
	} = actions;

	const mediaObject = (typeof media === 'undefined') || media;

	return (
		<div className={blockClass}>
			<div className={classnames(`${blockClass}__media`, `${blockClass}__media--horizontal-${mediaHorizontalPosition}`)}>
				<ImageEditor
					blockClass={blockClass}
					media={mediaObject}
					onChangeMedia={onChangeMedia}
				/>
			</div>

			<div className={classnames(
				`${blockClass}__content`,
				`${blockClass}__content--vertical-${contentVerticalPosition}`,
				`${blockClass}__content--horizontal-${contentHorizontalPosition}`,
			)}>
				<div className={`${blockClass}__content-wrap`}>
					<div className={`${blockClass}__heading`}>
						<RichText
							placeholder={__('Add Heading', 'eightshift-boilerplate')}
							className={`${blockClass}__heading`}
							onChange={onChangeHeading}
							value={heading}
						/>
					</div>
					
					<div className={`${blockClass}__paragraph`}>
						<RichText
							placeholder={__('Add Paragraph', 'eightshift-boilerplate')}
							className={`${blockClass}__paragraph`}
							onChange={onChangeParagraph}
							value={paragraph}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};
