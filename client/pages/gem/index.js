import { EpicGemsComponent } from "../../component/gems/epic-gems.component.js";
import { GemsStatusComponent } from "../../component/gems/gems-status.component.js";
import { RareGemsComponent } from "../../component/gems/rare-gems.component.js";
import { UncommonGemsComponent } from "../../component/gems/uncommon-gems.component.js";
import { PageComponent, PageItemComponent } from "../../component/page.js";
import { TabHeaderComponent } from "../../component/tab/header/header.component.js";
import { gemStore } from "../../store/gem/gem.store.js";
import { jewelStore } from "../../store/jewel/jewel.store.js";

class GemPage {
  constructor(root) {
    this.#initUI(root);

    gemStore.fetch();

    this.#polling();
  }

  #initUI(root) {
    const page = new PageComponent(PageItemComponent);

    page.addChildren(
      new UncommonGemsComponent(),
      new RareGemsComponent(),
      new EpicGemsComponent()
    );

    page.addChildren(new GemsStatusComponent());

    page.attachTo(root, "beforeend");

    new TabHeaderComponent().attachTo(root, "afterbegin");
  }

  #polling() {
    setInterval(() => jewelStore.fetch(), 60 * 1000);
  }
}

export const gemPage = new GemPage(document.getElementById("root"));
