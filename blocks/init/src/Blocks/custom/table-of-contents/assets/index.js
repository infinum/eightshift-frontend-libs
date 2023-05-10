import domReady from '@wordpress/dom-ready';

domReady(async () => {
	const tocBlocks = document.querySelectorAll('.js-block-table-of-contents');
	const scrollMarginClass = 'toc-scroll-margin';
	const entryClass = 'block-table-of-contents__entry';

	if (tocBlocks?.length < 1) {
		return;
	}

	tocBlocks.forEach((tocBlock) => {
		const levelsToUse = tocBlock?.dataset?.levels ?? 'h1,h2,h3,h4,h5,h6';
		const splitLevelsToUse = levelsToUse.split(',');

		const headings = document.querySelectorAll(`.main-content :is(${levelsToUse})`);

		headings.forEach((h) => {
			h.classList.add(scrollMarginClass);

			const entry = document.createElement('button');
			entry.classList.add(entryClass);
			entry.innerText = h.innerText;

			entry.dataset.level = splitLevelsToUse.findIndex((v) => v === h.tagName.toLowerCase()) + 1;

			entry.addEventListener('click', () => {
				h.scrollIntoView({
					behavior: 'smooth',
					block: 'start',
					inline: 'start',
				});
			});

			tocBlock.appendChild(entry);
		});
	});
});
