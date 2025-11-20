import { JewelRepository } from "../../../repository/jewel/jewel.repository.js";
import { JewelStore } from "../../../store/jewel/jewel.store.js";
import { RepaintableComponent } from "../../component.js";
import { ItemListComponent } from "../item/list.component.js";

export class JewelPageComponent extends RepaintableComponent {
  #store = new JewelStore(new JewelRepository());

  constructor() {
    super(`
      <div class="tab__page">
      </div>
    `);

    this.#store.state.subscribe(() => this.#bind());

    this.#store.fetch();
    this.#bind();
  }

  #bind() {
    this.cleanup();
    const doomfireList = this.#store.state.value.doomfire;
    const blazingList = this.#store.state.value.blazing;

    const doomfireListElement = new ItemListComponent(1, doomfireList);
    const blazingListElement = new ItemListComponent(1, blazingList);

    doomfireListElement.attachTo(this.element);
    blazingListElement.attachTo(this.element);
  }

  show() {
    this.element.classList.remove("page-hidden");
  }

  hide() {
    this.element.classList.add("page-hidden");
  }
}
