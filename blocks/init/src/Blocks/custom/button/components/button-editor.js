import React from 'react'; // eslint-disable-line no-unused-vars
import { ButtonEditor as ButtonEditorComponent } from '../../../components/button/components/button-editor';

export const ButtonEditor = ({ attributes, actions }) => {
	const {
		blockClass,
		button,
	} = attributes;

	const {
		onChangeButtonTitle,
	} = actions;

	const buttonObject = (typeof button === 'undefined') || button;

	return (
		<ButtonEditorComponent
			blockClass={blockClass}
			button={buttonObject}
			onChangeTitle={onChangeButtonTitle}
		/>
	);
};
