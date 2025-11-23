import { TabHeaderComponent } from "../../component/tab/header/header.component.js";
import { JewelPageComponent } from "../../component/tab/page/jewel-page.component.js";
import { JewelStore } from "../../store/jewel/jewel.store.js";

class JewelPage {
  #jewelPage;
  #tab;
  #jewelStore;

  constructor(root) {
    this.#jewelStore = new JewelStore();

    this.#tab = new TabHeaderComponent();
    this.#jewelPage = new JewelPageComponent(this.#jewelStore);

    this.#initUI(root);

    setInterval(this.#polling.bind(this), 60000);
  }

  #initUI(root) {
    this.#tab.attachTo(root, "afterbegin");
    this.#jewelPage.attachTo(root, "beforeend");
  }

  #polling() {
    this.#jewelStore.fetch();
  }
}

export const jewelPage = new JewelPage(document.getElementById("tab"));
