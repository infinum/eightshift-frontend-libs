import React from 'react';
import globalManifest from './../../manifest.json';
import manifest from './../manifest.json';
import readme from './readme.mdx';
import { WrapperEditor } from '../components/wrapper-editor';
import { WrapperOptions } from '../components/wrapper-options';

export default {
	title: `Wrapper/${manifest.title}`,
	parameters: {
		docs: {
			page: readme
		}
	},
};

const props = {
	attributes: manifest.example.attributes,
	setAttributes: (val) => {
		console.log(val);
	},
};

const childStyle = {
	backgroundColor: globalManifest.globalVariables.colors[1].color,
	color: globalManifest.globalVariables.colors[2].color,
	padding: '2rem 0'
};

const optionsStyle = {
	maxWidth: '400px',
};

const responsiveWidthProps = {
	attributes: {
		...props.attributes,
		wrapperWidthLarge: 12,
		wrapperWidthDesktop: 6,
		wrapperWidthTablet: 3,
		wrapperWidthMobile: 12,
	}
};

const responsiveOffsetProps = {
	attributes: {
		...props.attributes,
		wrapperWidthLarge: 2,
		wrapperWidthMobile: 2,
		wrapperOffsetLarge: 11,
		wrapperOffsetDesktop: 6,
		wrapperOffsetTablet: 3,
		wrapperOffsetMobile: 8,
	}
};

const responsiveIsFullWidthProps = {
	attributes: {
		...props.attributes,
		wrapperWidthLarge: 5,
		wrapperIsFullWidthLarge: true,
		wrapperIsFullWidthDesktop: false,
		wrapperIsFullWidthTablet: true,
		wrapperIsFullWidthMobile: false
	}
};

const responsiveDifferentLayoutsProps = {
	attributes: {
		...props.attributes,
		wrapperWidthLarge: 12,
		wrapperOffsetLarge: 3,
		wrapperIsFullWidthLarge: true,

		wrapperWidthDesktop: 7,
		wrapperOffsetDesktop: 6,
		wrapperIsFullWidthDesktop: false,

		wrapperWidthTablet: 13,
		wrapperOffsetTablet: 3,
		wrapperIsFullWidthTablet: true,

		wrapperOffsetMobile: 2,
		wrapperWidthMobile: 6,
		wrapperIsFullWidthMobile: false
	}
};

const responsiveDifferentSpacingInOutProps = {
	attributes: {
		...props.attributes,
		wrapperBackgroundColor: 'bianchi200',
		wrapperDividerBottomLarge: true,
		wrapperSpacingTopLarge: 2,
		wrapperSpacingTopDesktop: 0,
		wrapperSpacingTopTablet: 8,
		wrapperSpacingTopMobile: 2,
		wrapperSpacingBottomLarge: 12,
		wrapperSpacingBottomDesktop: 6,
		wrapperSpacingBottomTablet: 1,
		wrapperSpacingBottomMobile: 6,
		wrapperSpacingTopInLarge: 3,
		wrapperSpacingTopInDesktop: 12,
		wrapperSpacingTopInTablet: 4,
		wrapperSpacingTopInMobile: 7,
		wrapperSpacingBottomInLarge: 5,
		wrapperSpacingBottomInDesktop: 6,
		wrapperSpacingBottomInTablet: 2,
		wrapperSpacingBottomInMobile: 4,
	}
};

const responsiveHideProps = {
	attributes: {
		...props.attributes,
		wrapperBackgroundColor: 'bianchi200',
		wrapperHideLarge: true,
		wrapperHideTablet: false,
		wrapperHideMobile: true,
	}
};

const responsiveSimpleIsFullWidthProps = {
	attributes: {
		...props.attributes,
		wrapperBackgroundColor: 'bianchi200',
		wrapperSimple: true,
		wrapperIsFullWidthLarge: true,
		wrapperIsFullWidthDesktop: false,
		wrapperIsFullWidthTablet: true,
		wrapperIsFullWidthMobile: false,
	}
};

export const responsiveWidth = () => (
	<WrapperEditor
		{...responsiveWidthProps}
		children={<div style={childStyle}>This is wrapper children content.</div>}
	/>
);

export const responsiveOffset = () => (
	<WrapperEditor
		{...responsiveOffsetProps}
		children={<div style={childStyle}>This is wrapper children content.</div>}
	/>
);

export const responsiveIsFullWidth = () => (
	<WrapperEditor
		{...responsiveIsFullWidthProps}
		children={<div style={childStyle}>This is wrapper children content.</div>}
	/>
);

export const responsiveDifferentLayouts = () => (
	<WrapperEditor
		{...responsiveDifferentLayoutsProps}
		children={<div style={childStyle}>This is wrapper children content.</div>}
	/>
);

export const responsiveDifferentSpacingInOut = () => (
	<WrapperEditor
		{...responsiveDifferentSpacingInOutProps}
		children={<div>This is wrapper children content.</div>}
	/>
);

export const responsiveHide = () => (
	<WrapperEditor
		{...responsiveHideProps}
		children={<div>Hidden on tablet.</div>}
	/>
);

export const responsiveSimpleIsFullWidth = () => (
	<WrapperEditor
		{...responsiveSimpleIsFullWidthProps}
		children={<div>Full width is on large and tablet</div>}
	/>
);

export const editor = () => (
	<WrapperEditor
		{...props}
		children={<div style={childStyle}>This is wrapper children content.</div>}
	/>
);

export const options = () => (
	<div style={optionsStyle}>
		<WrapperOptions
			{...props}
		/>
	</div>
);
