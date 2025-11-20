import { EngraveRepository } from "../../../repository/engrave/engrave.repository.js";
import { EngraveStore } from "../../../store/engrave/engrave.store.js";
import { RepaintableComponent } from "../../component.js";
import { ItemListComponent } from "../item/list.component.js";

export class EngravePageComponent extends RepaintableComponent {
  #store = new EngraveStore(new EngraveRepository());

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
    const engraveList = this.#store.state.value.engrave;

    const engraveListElement = new ItemListComponent(2, engraveList);
    engraveListElement.attachTo(this.element);
  }

  show() {
    this.element.classList.remove("page-hidden");
  }

  hide() {
    this.element.classList.add("page-hidden");
  }
}
