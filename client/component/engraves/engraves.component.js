import { engraveStore } from "../../store/engrave/engrave.store.js";
import { ItemComponent } from "../tab/item/item.component.js";
import { ItemListComponent } from "../tab/item/list.component.js";

export class EngravesComponent extends ItemListComponent {
  constructor() {
    super(2, ItemComponent);

    engraveStore.state.subscribe(() => {
      this.#bind();
    });

    this.#bind();
  }

  #bind() {
    const { engrave } = engraveStore.state.value;

    super.bind(engrave);
  }
}
