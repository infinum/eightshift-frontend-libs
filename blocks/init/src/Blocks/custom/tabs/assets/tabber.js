export class Tabber {
    constructor(options) {
        this.tabsElement = options.tabsElement;
        this.options = options;
        this.tabsElement.querySelector(`.${this.options.tabJsClass}`).classList.add(this.options.tabVisibleClass);
        this.tabPanel = this.tabsElement.querySelector(`.${this.options.tabPanelJsClass}`); 
    }
    tabPanelClickHandler(e){
        this.tabsElement.querySelector(`.${this.options.tabVisibleClass}`).classList.remove(this.options.tabVisibleClass);
        this.tabPanel.querySelector(`.${this.options.tabPanelItemActiveClass}`).classList.remove(this.options.tabPanelItemActiveClass);
        const triggeredTab = e.target.dataset.triggersTabId;
        this.tabsElement.querySelector(`[data-tab-id="${triggeredTab}"]`).classList.add(this.options.tabVisibleClass);
        this.tabPanel.querySelector(`[data-triggers-tab-id="${triggeredTab}"]`).parentNode.classList.add(this.options.tabPanelItemActiveClass);
        e.target.classList.add(this.tabPanelItemActiveClass);
    }
    init() {
        const tabs = this.tabsElement.querySelectorAll(`.${this.options.tabJsClass}`);
        [...tabs].forEach((tab) => {
            const template = document.querySelector(`#${this.options.tabPanelItemTemplateId}`);
            let tabPanelItem = template.content.firstElementChild.cloneNode(true);
            tabPanelItem.querySelector(`.${this.options.tabPanelItemButtonJsClass}`).dataset.triggersTabId = tab.dataset.tabId;
            tabPanelItem.querySelector(`.${this.options.tabPanelItemButtonJsClass}`).textContent = tab.dataset.tabTitle;
            tabPanelItem.querySelector(`.${this.options.tabPanelItemButtonJsClass}`).addEventListener("click", (e) => {
                this.tabPanelClickHandler(e);
            });
            this.tabPanel.appendChild(tabPanelItem);
        });
        this.tabPanel.firstElementChild.classList.add(this.options.tabPanelItemActiveClass);
    }
}