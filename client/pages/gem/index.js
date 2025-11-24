import { TabHeaderComponent } from "../../component/tab/header/header.component.js";
import { ItemComponent } from "../../component/tab/item/item.component.js";
import { ItemListWrapperComponent } from "../../component/tab/item/list-wrapper.component.js";
import { ItemListComponent } from "../../component/tab/item/list.component.js";
import { TabStatusComponent } from "../../component/tab/item/status.component.js";
import { GemPageComponent } from "../../component/tab/page/gem-page.component.js";
import { GemStore } from "../../store/gem/gem.store.js";

class GemPage {
  #gemPage;
  #tab;
  #gemStore;

  constructor(root) {
    this.#gemStore = new GemStore();

    this.#initUI(root);

    setInterval(this.#polling.bind(this), 60 * 1000);
  }

  #initUI(root) {
    this.#tab = new TabHeaderComponent();
    this.#gemPage = new GemPageComponent(
      ItemListWrapperComponent,
      ItemListComponent,
      ItemComponent,
      TabStatusComponent
    );

    this.#tab.attachTo(root, "afterbegin");
    this.#gemPage.attachTo(root, "beforeend");
  }

  #polling() {
    this.#gemStore.fetch();
  }
}

export const gemPage = new GemPage(document.getElementById("tab"));
