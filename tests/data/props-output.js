/**
 * Define what props should or should not return on each level of a dependency tree, using the newName to identify 
 * dependencies.
 *
 * Ideally all blocks from the project should have a top level entry here with
 * their dependency tree and `expected` / `notExpected` attributes and `prefix` defined.
 */
export const propsOutput = {
	// Accordion block
	accordion: {
		components: {
			accordion: {
				expected: [
					'accordionAccordionContent',
					'accordionAccordionTitle',
				],
				notExpected: [
					'accordionContent',
				],
				prefix: "accordionAccordion"
			}
		}
	},
	// Mock blockquote block
	'mock-blockquote': {
		components: {
			blockquote: {
				expected: [
					'mockBlockquoteBlockquoteBlockquoteImageUrl',
					'mockBlockquoteBlockquoteBlockquoteHeadingContent',
				],
				notExpected: [
					'blockquoteCardImageUrl',
				],
				prefix: 'blockquote',
				components: {
					blockquote: {
						expected: [
							'mockBlockquoteBlockquoteBlockquoteImageUrl',
							'mockBlockquoteBlockquoteBlockquoteHeadingContent',
						],
						notExpected: [
							'blockquoteCardImageUrl',
						],
						prefix: 'blockquoteBlockquote',
						components: {
							image: {
								expected: [
									'mockBlockquoteBlockquoteBlockquoteImageUrl',
								],
								notExpected: [
									'blockquoteBlockquoteHeadingContent',
									'blockquoteBlockquoteIntroContent',
								],
								prefix: 'blockquoteBlockquoteImage',
							},
							heading: {
								expected: [
									'mockBlockquoteBlockquoteBlockquoteHeadingContent',
								],
								notExpected: [
									'blockquoteBlockquoteImageUrl',
									'blockquoteBlockquoteIntroContent',
								],
								prefix: 'blockquoteBlockquoteHeading',
							},
							intro: {
								expected: [
									'mockBlockquoteBlockquoteBlockquoteIntroMockTypographyContent',
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
	// Card block.
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
