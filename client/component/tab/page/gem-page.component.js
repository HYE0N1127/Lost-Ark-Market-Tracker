import { GemRepository } from "../../../repository/gem/gem.repository.js";
import { GemStore } from "../../../store/gem/gem.store.js";
import { RepaintableComponent } from "../../component.js";
import { ItemListComponent } from "../item/list.component.js";

export class GemPageComponent extends RepaintableComponent {
  #store = new GemStore(new GemRepository());

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
    const uncommonList = this.#store.state.value.uncommonGem;
    const rareList = this.#store.state.value.rareGem;
    const epicList = this.#store.state.value.epicGem;

    const uncommonListElement = new ItemListComponent(1, uncommonList);
    const rareListElement = new ItemListComponent(1, rareList);
    const epicListElement = new ItemListComponent(1, epicList);

    uncommonListElement.attachTo(this.element);
    rareListElement.attachTo(this.element);
    epicListElement.attachTo(this.element);
  }

  show() {
    this.element.classList.remove("page-hidden");
  }

  hide() {
    this.element.classList.add("page-hidden");
  }
}
