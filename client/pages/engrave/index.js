import { EngravesStatusComponent } from "../../component/engraves/engraves-status.component.js";
import { EngravesComponent } from "../../component/engraves/engraves.component.js";
import { PageComponent, PageItemComponent } from "../../component/page.js";
import { TabHeaderComponent } from "../../component/tab/header/header.component.js";
import { engraveStore } from "../../store/engrave/engrave.store.js";

class MainPage {
  constructor(root) {
    this.#initUI(root);

    engraveStore.fetch();

    this.#polling();
  }

  #initUI(root) {
    const page = new PageComponent(PageItemComponent);

    page.addChildren(new EngravesComponent());

    page.addChildren(new EngravesStatusComponent());

    page.attachTo(root, "beforeend");

    new TabHeaderComponent().attachTo(root, "afterbegin");
  }

  #polling() {
    setInterval(() => this.engraveStore.fetch(), 60 * 1000);
  }
}

export const mainPage = new MainPage(document.getElementById("root"));
