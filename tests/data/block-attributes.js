/**
 * Define all expected block attributes (after taking into consideration their dependencies)
 * you wish to test here.
 */
export const blockAttributes = {
	carousel: {
		expected:[
			'wrapperUse',
			'carouselAllowedBlocks'
		],
		notExpected: [
			'headingContent',
		]
	},
	'mock-blockquote': {
		expected:[
			'mockBlockquoteBlockquoteBlockquoteHeadingContent',
			'mockBlockquoteBlockquoteBlockquoteIntroMockTypographyUse',
			'mockBlockquoteBlockquoteBlockquoteParagraphMockTypographyContent'
		],
		notExpected: [
			'headingContent',
			'cardHeadingContent',
		]
	},
};
