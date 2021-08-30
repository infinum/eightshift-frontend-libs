import MicroModal from 'micromodal';

export class Modal {
	constructor(options) {
		this.openClass = options.openClass;
		this.jsClass = options.jsClass;
	}

	init() {
		MicroModal.init({
			openClass: this.openClass,
			openTrigger: `data-${this.jsClass}-open`,
			closeTrigger: `data-${this.jsClass}-close`,
			disableScroll: true,
		});
	}
}