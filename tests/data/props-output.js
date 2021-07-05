/**
 * Define what props should or should not return on each lvl of a dependency tree, using the newName to identify 
 * dependencies.
 */
export const propsOutput = {
	accordion: {
		components: {
			accordion: {
				expected: [
					'accordionContent',
					'accordionTitle',
				],
				notExpected: [
					'accordionAccordionContent',
				],
				prefix: "accordion"
			}
		}
	},
	'mock-blockquote': {
		components: {
			blockquote: {
				expected: [
					'blockquoteBlockquoteImageUrl',
					'blockquoteBlockquoteHeadingContent',
				],
				notExpected: [
					'blockquoteCardImageUrl',
				],
				prefix: 'blockquote',
				components: {
					blockquote: {
						expected: [
							'blockquoteBlockquoteImageUrl',
							'blockquoteBlockquoteHeadingContent',
						],
						notExpected: [
							'blockquoteCardImageUrl',
						],
						prefix: 'blockquoteBlockquote',
						components: {
							image: {
								expected: [
									'blockquoteBlockquoteImageUrl',
								],
								notExpected: [
									'blockquoteBlockquoteHeadingContent',
									'blockquoteBlockquoteIntroContent',
								],
								prefix: 'blockquoteBlockquoteImage',
							},
							heading: {
								expected: [
									'blockquoteBlockquoteHeadingContent',
								],
								notExpected: [
									'blockquoteBlockquoteImageUrl',
									'blockquoteBlockquoteIntroContent',
								],
								prefix: 'blockquoteBlockquoteHeading',
							},
							intro: {
								expected: [
									'blockquoteBlockquoteIntroTypographyContent',
								],
								notExpected: [
									'blockquoteBlockquoteImageUrl',
									'blockquoteBlockquoteIntroContent',
									'blockquoteBlockquoteHeadingContent',
								],
								prefix: 'blockquoteBlockquoteIntro',
							},
						}
					}
				}
			}
		}
	},
	card: {
		components: {
			card: {
				expected: [
					'cardAlign',
					'cardHeadingContent',
					'cardImageUrl',
					'cardButtonContent',
				],
				notExpected: [
					'blockquoteCardImageUrl'
				],
				prefix: "card",
				components: {
					image: {
						expected: [
							'cardImageUrl',
						],
						notExpected: [
							'blockquoteCardImageUrl',
							'cardAlign',
							'cardHeadingContent',
							'cardButtonContent',
						],
						prefix: 'cardImage',
					},
					intro: {
						expected: [
							'cardIntroContent',
						],
						notExpected: [
							'blockquoteCardImageUrl',
							'cardAlign',
							'cardHeadingContent',
							'cardButtonContent',
						],
						prefix: 'cardIntro',
					},
					heading: {
						expected: [
							'cardHeadingContent',
						],
						notExpected: [
							'blockquoteCardImageUrl',
							'cardAlign',
							'cardIntroContent',
							'cardButtonContent',
						],
						prefix: 'cardHeading',
					},
					paragraph: {
						expected: [
							'cardParagraphContent',
						],
						notExpected: [
							'blockquoteCardImageUrl',
							'cardAlign',
							'cardIntroContent',
							'cardButtonContent',
						],
						prefix: 'cardParagraph',
					},
					button: {
						expected: [
							'cardButtonContent',
						],
						notExpected: [
							'blockquoteCardImageUrl',
							'cardAlign',
							'cardIntroContent',
							'cardParagraphContent',
						],
						prefix: 'cardButton',
					}
				}
			}
		}
	}
};