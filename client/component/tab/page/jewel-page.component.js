import { JewelStore } from "../../../store/jewel/jewel.store.js";
import { RepaintableComponent } from "../../component.js";

export class JewelPageComponent extends RepaintableComponent {
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
    this.#store = new JewelStore();

    this.#store.state.subscribe(() => this.#bind());

    this.#store.fetch();
    this.#bind();
  }

  #bind() {
    this.cleanup();
    const doomfireList = this.#store.state.value.doomfire;
    const blazingList = this.#store.state.value.blazing;

    const doomfireListElement = new this.#listRenderer(
      1,
      doomfireList,
      this.#itemRenderer
    );
    const blazingListElement = new this.#listRenderer(
      1,
      blazingList,
      this.#itemRenderer
    );

    doomfireListElement.attachTo(this.element);
    blazingListElement.attachTo(this.element);
  }
}
