import domReady from '@wordpress/dom-ready';
import {
	blockJsClass,
	tabJsClass,
	tabPanelJsClass,
	tabVisibleClass,
	tabPanelItemActiveClass,
	tabPanelItemTemplateId,
	tabPanelItemButtonJsClass
} from './../manifest.json'

domReady(() => {
	const tabSelector = `.${blockJsClass}`;
	const tabElements = document.querySelectorAll(tabSelector);
	
	if(tabElements.length){
		import('./tabber').then(({ Tabber }) => {
			[...tabElements].forEach((item) => {
				const tabber = new Tabber({
					tabsElement: item,
					tabJsClass,
					tabPanelJsClass,
					tabVisibleClass,
					tabPanelItemActiveClass,
					tabPanelItemTemplateId,
					tabPanelItemButtonJsClass
				});
				tabber.init();
			});
		});
	}
});