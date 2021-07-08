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
			'blockquoteBlockquoteHeadingContent',
			'blockquoteBlockquoteIntroMockTypographyUse',
			'blockquoteBlockquoteParagraphMockTypographyContent'
		],
		notExpected: [
			'headingContent',
			'cardHeadingContent',
		]
	},
};