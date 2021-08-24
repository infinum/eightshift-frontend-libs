import MicroModal from 'micromodal';

export class Modal {
	constructor(options) {
		this.openTrigger = options.openTrigger;
		this.closeTrigger = options.closeTrigger;
		this.openClass = options.openClass;
	}

	init() {
		MicroModal.init({
			openTrigger: this.openTrigger,
			closeTrigger: this.closeTrigger,
			openClass: this.openClass,
			disableScroll: true,
			awaitOpenAnimation: true,
			awaitCloseAnimation: true
		});
	}
}