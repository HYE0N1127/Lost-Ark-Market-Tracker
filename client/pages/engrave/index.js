import { TabHeaderComponent } from "../../component/tab/header/header.component.js";
import { ItemComponent } from "../../component/tab/item/item.component.js";
import { ItemListWrapperComponent } from "../../component/tab/item/list-wrapper.component.js";
import { ItemListComponent } from "../../component/tab/item/list.component.js";
import { TabStatusComponent } from "../../component/tab/item/status.component.js";
import { EngravePageComponent } from "../../component/tab/page/engrave-page.component.js";
import { EngraveStore } from "../../store/engrave/engrave.store.js";

class MainPage {
  #engravePage;
  #tab;
  #engraveStore;

  constructor(root) {
    this.#engraveStore = new EngraveStore();

    this.#initUI(root);

    setInterval(this.#polling.bind(this), 60 * 1000);
  }

  #initUI(root) {
    this.#tab = new TabHeaderComponent();
    this.#engravePage = new EngravePageComponent(
      ItemListWrapperComponent,
      ItemListComponent,
      ItemComponent,
      TabStatusComponent
    );

    this.#tab.attachTo(root, "afterbegin");
    this.#engravePage.attachTo(root, "beforeend");
  }

  #polling() {
    this.#engraveStore.fetch();
  }
}

export const mainPage = new MainPage(document.getElementById("tab"));
