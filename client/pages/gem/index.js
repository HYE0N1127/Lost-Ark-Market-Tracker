import { TabHeaderComponent } from "../../component/tab/header/header.component.js";
import { GemPageComponent } from "../../component/tab/page/gem-page.component.js";
import { GemStore } from "../../store/gem/gem.store.js";

class GemPage {
  #gemPage;
  #tab;
  #gemStore;

  constructor(root) {
    this.#gemStore = new GemStore();

    this.#tab = new TabHeaderComponent();
    this.#gemPage = new GemPageComponent(this.#gemStore);

    this.#initUI(root);

    setInterval(this.#polling.bind(this), 60000);
  }

  #initUI(root) {
    this.#tab.attachTo(root, "afterbegin");
    this.#gemPage.attachTo(root, "beforeend");
  }

  #polling() {
    this.#gemStore.fetch();
  }
}

export const gemPage = new GemPage(document.getElementById("tab"));
