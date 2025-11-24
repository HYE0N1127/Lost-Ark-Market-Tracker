import { GemStore } from "../../../store/gem/gem.store.js";
import { RepaintableComponent } from "../../component.js";

export class GemPageComponent extends RepaintableComponent {
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
    this.#store = new GemStore();

    this.#store.state.subscribe(() => this.#bind());

    this.#store.fetch();

    this.#bind();
  }

  #bind() {
    this.cleanup();

    const { uncommonGem, rareGem, epicGem, status } = this.#store.state.value;

    const uncommonListElement = new this.#listRenderer(
      1,
      uncommonGem,
      this.#itemRenderer
    );
    const rareListElement = new this.#listRenderer(
      1,
      rareGem,
      this.#itemRenderer
    );
    const epicListElement = new this.#listRenderer(
      1,
      epicGem,
      this.#itemRenderer
    );

    uncommonListElement.attachTo(this.element);
    rareListElement.attachTo(this.element);
    epicListElement.attachTo(this.element);

    if (status === "error") {
      /** render error ui */
    }

    if (status === "maintenance") {
      /** render maintenance ui */
    }
  }
}
