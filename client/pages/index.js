import { TabHeaderComponent } from "../component/tab/header/header.component.js";
import { EngravePageComponent } from "../component/tab/page/engrave-page.component.js";
import { GemPageComponent } from "../component/tab/page/gem-page.component.js";
import { JewelPageComponent } from "../component/tab/page/jewel-page.component.js";

import { JewelRepository } from "../repository/jewel/jewel.repository.js";
import { JewelStore } from "../store/jewel/jewel.store.js";

import { EngraveStore } from "../store/engrave/engrave.store.js";
import { EngraveRepository } from "../repository/engrave/engrave.repository.js";

import { GemStore } from "../store/gem/gem.store.js";
import { GemRepository } from "../repository/gem/gem.repository.js";

class MainPage {
  #jewelPage;
  #gemPage;
  #engravePage;
  #tab;

  #jewelStore;
  #engraveStore;
  #gemStore;

  #interval;

  constructor(root) {
    this.#gemStore = new GemStore(new GemRepository());
    this.#engraveStore = new EngraveStore(new EngraveRepository());
    this.#jewelStore = new JewelStore(new JewelRepository());

    this.#tab = new TabHeaderComponent();
    this.#jewelPage = new JewelPageComponent(this.#jewelStore);
    this.#engravePage = new EngravePageComponent(this.#engraveStore);
    this.#gemPage = new GemPageComponent(this.#gemStore);

    this.#initUI(root);

    this.#interval = setInterval(this.#polling.bind(this), 60000);
  }

  #initUI(root) {
    this.#tab.attachTo(root, "afterbegin");
    this.#engravePage.attachTo(root, "beforeend");
    this.#jewelPage.attachTo(root, "beforeend");
    this.#gemPage.attachTo(root, "beforeend");

    this.#jewelPage.hide();
    this.#gemPage.hide();

    this.#tab.element.addEventListener("tab-changed", (event) => {
      this.#handleTabChanged(event.detail.tabId);
    });
  }

  #polling() {
    console.log("polling");
    this.#jewelStore.fetch();
    this.#engraveStore.fetch();
    this.#gemStore.fetch();
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
