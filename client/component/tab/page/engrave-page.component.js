import { EngraveStore } from "../../../store/engrave/engrave.store.js";
import { RepaintableComponent } from "../../component.js";
import { ItemListComponent } from "../item/list.component.js";

export class EngravePageComponent extends RepaintableComponent {
  #store;
  #listRenderer;
  #itemRenderer;

  constructor(listRenderer, itemRenderer) {
    super(`
      <div class="tab__page">
      </div>
    `);

    this.#listRenderer = listRenderer;
    this.#itemRenderer = itemRenderer;
    this.#store = new EngraveStore();

    this.#store.state.subscribe(() => this.#bind());

    this.#store.fetch();
    this.#bind();
  }

  #bind() {
    this.cleanup();
    const engraveList = this.#store.state.value.engrave;

    const engraveListElement = new this.#listRenderer(
      2,
      engraveList,
      this.#itemRenderer
    );
    engraveListElement.attachTo(this.element);
  }
}
