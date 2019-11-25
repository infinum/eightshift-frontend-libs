export class Tabs {

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

    this.$parent = $(this.parentElement);
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
    return $(`${this.headElement}[data-tab="${id}"]`);
  }

  getContent(id) {
    return $(`${this.contentElement}[data-tab-content="${id}"]`);
  }

  isTabActive(id) {
    return this.getHead(id).hasClass(this.ACTIVE_CLASS);
  }

  isDisabled(id) {
    const isDisabled = this.getParentSelector(id).attr('data-init-disabled');

    if (isDisabled !== '1') {
      return false;
    }
    return true;
  }

  showActiveTab(id) {
    this.getHead(id).addClass(this.ACTIVE_CLASS);
    this.getContent(id).addClass(this.ACTIVE_CLASS);
  }

  hideAllTabs(id) {
    this.getParentSelector(id).find(this.headElement).removeClass(this.ACTIVE_CLASS);
    this.getParentSelector(id).find(this.contentElement).removeClass(this.ACTIVE_CLASS);
  }

  setActiveItem(id) {
    if (!this.isTabActive(id)) {
      this.hideAllTabs(id);
      this.showActiveTab(id);

      if (this.getParentSelector(id).attr('data-prevent-href') !== 'true') {
        window.location.hash = id;
      }

    }
  }
}
