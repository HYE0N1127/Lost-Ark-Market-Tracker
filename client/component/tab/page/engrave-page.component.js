import { RepaintableComponent } from "../../component.js";
import { ItemListComponent } from "../item/list.component.js";

export class EngravePageComponent extends RepaintableComponent {
  #store;

  constructor(store) {
    super(`
      <div class="tab__page">
      </div>
    `);

    this.#store = store;

    this.#store.state.subscribe(() => this.#bind());

    this.#store.fetch();
    this.#bind();
  }

  #bind() {
    this.cleanup();
    const engraveList = this.#store.state.value.engrave;
    console.log(engraveList);

    const engraveListElement = new ItemListComponent(2, engraveList);
    engraveListElement.attachTo(this.element);
  }
}
