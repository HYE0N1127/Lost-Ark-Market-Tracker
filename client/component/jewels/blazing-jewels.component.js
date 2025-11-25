import { jewelStore } from "../../store/jewel/jewel.store.js";
import { ItemListComponent } from "../tab/item/list.component.js";
import { ItemComponent } from "../tab/item/item.component.js";

export class BlazingJewelsComponent extends ItemListComponent {
  constructor() {
    super(1, ItemComponent);

    jewelStore.state.subscribe(() => {
      this.#bind();
    });

    this.#bind();
  }

  #bind() {
    const { blazing } = jewelStore.state.value;

    super.bind(blazing);
  }
}
