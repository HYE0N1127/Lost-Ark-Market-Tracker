import { TabHeaderComponent } from "../component/tab/header/header.component.js";
import { EngravePageComponent } from "../component/tab/page/engrave-page.component.js";
import { GemPageComponent } from "../component/tab/page/gem-page.component.js";
import { JewelPageComponent } from "../component/tab/page/jewel-page.component.js";

class MainPage {
  #jewelPage;
  #gemPage;
  #engravePage;
  #tab;

  constructor(root) {
    this.#tab = new TabHeaderComponent();
    this.#jewelPage = new JewelPageComponent();
    this.#engravePage = new EngravePageComponent();
    this.#gemPage = new GemPageComponent();

    this.#tab.attachTo(root, "afterbegin");
    this.#engravePage.attachTo(root, "beforeend");
    this.#jewelPage.attachTo(root, "beforeend");
    this.#gemPage.attachTo(root, "beforeend");

    this.#jewelPage.hide();
    this.#gemPage.hide();

    this.#tab.element.addEventListener("tab-changed", (event) => {
      console.log(event.detail.tabId);
      this.#handleTabChanged(event.detail.tabId);
    });
  }

  #handleTabChanged(tabId) {
    this.#jewelPage.hide();
    this.#engravePage.hide();
    this.#gemPage.hide();

    switch (tabId) {
      case "engrave":
        this.#engravePage.show();
        break;

      case "jewel":
        this.#jewelPage.show();
        break;

      case "gem":
        this.#gemPage.show();
        break;
    }
  }
}

export const mainPage = new MainPage(document.getElementById("tab"));
