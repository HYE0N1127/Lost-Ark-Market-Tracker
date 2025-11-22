import { JewelRepository } from "../../repository/jewel/jewel.repository.js";
import { State } from "../../util/state.js";

export class JewelStore {
  #repository = new JewelRepository();

  state = new State({
    updatedAt: "",
    doomfire: [],
    blazing: [],
    status: "",
  });

  async fetch() {
    const state = this.state;
    const jewels = (await this.#repository.getJewel()).data;

    this.state.value = {
      ...state,
      updatedAt: jewels.lastUpdatedAt,
      doomfire: jewels.result.doomfire,
      blazing: jewels.result.blazing,
    };
  }
}
