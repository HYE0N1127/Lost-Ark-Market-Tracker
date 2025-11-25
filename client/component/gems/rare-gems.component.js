import { gemStore } from "../../store/gem/gem.store.js";
import { ItemComponent } from "../tab/item/item.component.js";
import { ItemListComponent } from "../tab/item/list.component.js";

export class RareGemsComponent extends ItemListComponent {
  constructor() {
    super(1, ItemComponent);

    gemStore.state.subscribe(() => {
      this.#bind();
    });

    this.#bind();
  }

  #bind() {
    const { rareGem } = gemStore.state.value;

    super.bind(rareGem);
  }
}
