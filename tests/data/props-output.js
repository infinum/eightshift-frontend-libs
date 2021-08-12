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
				prefix: 'mockBlockquoteBlockquote',
				subComponents: {
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
					'cardCardAlign',
					'cardCardHeadingContent',
					'cardCardImageUrl',
					'cardCardButtonContent',
				],
				notExpected: [
					'blockquoteCardImageUrl'
				],
				prefix: "cardCard",
				components: {
					image: {
						expected: [
							'cardCardImageUrl',
						],
						notExpected: [
							'blockquoteCardImageUrl',
							'cardCardAlign',
							'cardHeadingContent',
							'cardButtonContent',
						],
						prefix: 'cardCardImage',
					},
					intro: {
						expected: [
							'cardCardIntroContent',
						],
						notExpected: [
							'blockquoteCardImageUrl',
							'cardCardAlign',
							'cardHeadingContent',
							'cardButtonContent',
						],
						prefix: 'cardCardIntro',
					},
					heading: {
						expected: [
							'cardCardHeadingContent',
						],
						notExpected: [
							'blockquoteCardImageUrl',
							'cardCardAlign',
							'cardIntroContent',
							'cardButtonContent',
						],
						prefix: 'cardCardHeading',
					},
					paragraph: {
						expected: [
							'cardCardParagraphContent',
						],
						notExpected: [
							'blockquoteCardImageUrl',
							'cardCardAlign',
							'cardIntroContent',
							'cardButtonContent',
						],
						prefix: 'cardCardParagraph',
					},
					button: {
						expected: [
							'cardCardButtonContent',
						],
						notExpected: [
							'blockquoteCardImageUrl',
							'cardCardAlign',
							'cardIntroContent',
							'cardParagraphContent',
						],
						prefix: 'cardCardButton',
					}
				}
			}
		}
	}
};
