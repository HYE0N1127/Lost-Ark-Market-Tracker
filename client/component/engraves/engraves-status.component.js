import { engraveStore } from "../../store/engrave/engrave.store.js";
import { TabStatusComponent } from "../tab/item/status.component.js";

export class EngravesStatusComponent extends TabStatusComponent {
  constructor() {
    super();

    engraveStore.state.subscribe(() => {
      this.#bind();
    });
  }

  #bind() {
    const { status, updatedAt } = engraveStore.state.value;

    super.bind(status, updatedAt);
  }
}
