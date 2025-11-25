import { gemStore } from "../../store/gem/gem.store.js";
import { ItemComponent } from "../tab/item/item.component.js";
import { ItemListComponent } from "../tab/item/list.component.js";

export class UncommonGemsComponent extends ItemListComponent {
  constructor() {
    super(1, ItemComponent);

    gemStore.state.subscribe(() => {
      this.#bind();
    });

    this.#bind();
  }

  #bind() {
    const { uncommonGem } = gemStore.state.value;

    super.bind(uncommonGem);
  }
}
