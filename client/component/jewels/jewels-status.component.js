import { TabStatusComponent } from "../tab/item/status.component.js";
import { jewelStore } from "../../store/jewel/jewel.store.js";

export class JewelsStatusComponent extends TabStatusComponent {
  constructor() {
    super();

    jewelStore.state.subscribe(() => {
      this.#bind();
    });
  }

  #bind() {
    const { status, updatedAt } = jewelStore.state.value;

    super.bind(status, updatedAt);
  }
}
