import { gemStore } from "../../store/gem/gem.store.js";
import { TabStatusComponent } from "../tab/item/status.component.js";

export class GemsStatusComponent extends TabStatusComponent {
  constructor() {
    super();

    gemStore.state.subscribe(() => {
      this.#bind();
    });
  }

  #bind() {
    const { status, updatedAt } = gemStore.state.value;

    super.bind(status, updatedAt);
  }
}
