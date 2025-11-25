import { TabHeaderComponent } from "../../component/tab/header/header.component.js";
import { PageComponent, PageItemComponent } from "../../component/page.js";
import { DoomfireJewelsComponent } from "../../component/jewels/doomfire-jewels.component.js";
import { BlazingJewelsComponent } from "../../component/jewels/blazing-jewels.component.js";
import { JewelsStatusComponent } from "../../component/jewels/jewels-status.component.js";

import { jewelStore } from "../../store/jewel/jewel.store.js";

class JewelPage {
  constructor(root) {
    this.#initUI(root);

    jewelStore.fetch();

    this.#polling();
  }

  #initUI(root) {
    const page = new PageComponent(PageItemComponent);

    page.addChildren(
      new DoomfireJewelsComponent(),
      new BlazingJewelsComponent()
    );

    page.addChildren(new JewelsStatusComponent());

    page.attachTo(root, "beforeend");

    new TabHeaderComponent().attachTo(root, "afterbegin");
  }

  #polling() {
    setInterval(() => jewelStore.fetch(), 60 * 1000);
  }
}

export const jewelPage = new JewelPage(document.getElementById("root"));
