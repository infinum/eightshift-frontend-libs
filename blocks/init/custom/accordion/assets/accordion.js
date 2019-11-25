export class Accordion {
  constructor(
    parentElement,
    headElement,
    contentElement,
    ACTIVE_CLASS,
  ) {
    this.parentElement = parentElement;
    this.headElement = headElement;
    this.contentElement = contentElement;

    this.ACTIVE_CLASS = ACTIVE_CLASS;

    this.$head = $(this.headElement);
  }

  init() {
    this.setActiveByUrl();
  }

  setActiveByUrl() {
    const hash = window.location.hash; // eslint-disable-line prefer-destructuring

    if (hash) {
      this.setActiveItem(hash.substring(1));
    }
  }

  getParentSelector(id) {
    return this.getHead(id).closest(this.parentElement);
  }

  getHead(id) {
    return $(`${this.headElement}[data-head="${id}"]`);
  }

  getContent(id) {
    return $(`${this.contentElement}[data-content="${id}"]`);
  }

  isHeadActive(id) {
    return this.getHead(id).hasClass(this.ACTIVE_CLASS);
  }

  showActiveItem(id) {
    this.getHead(id).addClass(this.ACTIVE_CLASS);
    this.getContent(id).addClass(this.ACTIVE_CLASS);
  }

  hideActiveItem(id) {
    this.getHead(id).removeClass(this.ACTIVE_CLASS);
    this.getContent(id).removeClass(this.ACTIVE_CLASS);
  }

  hideAllItems(id) {
    this.getParentSelector(id).find(this.headElement).removeClass(this.ACTIVE_CLASS);
    this.getParentSelector(id).find(this.contentElement).removeClass(this.ACTIVE_CLASS);
  }

  setActiveItem(id) {

    if (!this.isHeadActive(id)) {
      this.hideAllItems(id);
      this.showActiveItem(id);

      window.location.hash = id;
    } else {
      this.hideActiveItem(id);

      window.location.hash = '';
    }
  }
}
