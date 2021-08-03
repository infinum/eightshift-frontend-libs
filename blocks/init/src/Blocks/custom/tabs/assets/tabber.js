export class Tabber {

    constructor(options) {
        this.tabsBlockSelector = options.tabsBlockSelector;
        this.tabsBlocks = document.querySelectorAll(this.tabsBlockSelector);
        this.blockClass = options.blockClass;
        this.blockJsClass = options.blockJsClass;
        this.tabClass = options.innerBlockClass;
        this.tabJsClass = `js-${this.tabClass}`;

        this.IS_VISIBLE_CLASS = `${this.tabClass}--is-visible`;
        this.TAB_PANEL_CLASS = `${this.blockJsClass}-panel`;
        this.TAB_PANEL_ITEM_CLASS = `${this.TAB_PANEL_CLASS}-item`;
        this.TAB_PANEL_BUTTON_CLASS = `${this.TAB_PANEL_CLASS}-button`;
        this.IS_ACTIVE_CLASS = 'is-active';
        this.TAB_PANEL_ITEM_TEMPLATE_ID = `${this.TAB_PANEL_CLASS}-template`;
    }

    tabPanelClickHandler(e, tabsElement) {
        const tabPanel = tabsElement.querySelector(`.${this.TAB_PANEL_CLASS}`);

        tabsElement.querySelector(`.${this.IS_VISIBLE_CLASS}`).classList.remove(this.IS_VISIBLE_CLASS);
        tabPanel.querySelector(`.${this.IS_ACTIVE_CLASS}`).classList.remove(this.IS_ACTIVE_CLASS);

        const triggeredTab = e.target.dataset.triggersTabId;
        tabsElement.querySelector(`[data-tab-id="${triggeredTab}"]`).classList.add(this.IS_VISIBLE_CLASS);
        tabPanel.querySelector(`[data-triggers-tab-id="${triggeredTab}"]`).parentNode.classList.add(this.IS_ACTIVE_CLASS);
    }

    init() {
        [...this.tabsBlocks].forEach((tabsElement) => {
            const tabPanel = tabsElement.querySelector(`.${this.TAB_PANEL_CLASS}`);
            const tabs = tabsElement.querySelectorAll(`.${this.tabJsClass}`);

            [...tabs].forEach((tab) => {
                const template = document.querySelector(`#${this.TAB_PANEL_ITEM_TEMPLATE_ID}`);
                let tabPanelItem = template.content.firstElementChild.cloneNode(true);

                tabPanelItem.querySelector(`.${this.TAB_PANEL_BUTTON_CLASS}`).dataset.triggersTabId = tab.dataset.tabId;
                tabPanelItem.querySelector(`.${this.TAB_PANEL_BUTTON_CLASS}`).textContent = tab.dataset.tabTitle;

                tabPanelItem.querySelector(`.${this.TAB_PANEL_BUTTON_CLASS}`).addEventListener("click", (e) => {
                    this.tabPanelClickHandler(e, tabsElement);
                });

                tabPanel.appendChild(tabPanelItem);
            });

            tabPanel.firstElementChild.classList.add(this.IS_ACTIVE_CLASS);
            tabsElement.querySelector(`.${this.tabJsClass}`).classList.add(this.IS_VISIBLE_CLASS);
        });
    }
}
