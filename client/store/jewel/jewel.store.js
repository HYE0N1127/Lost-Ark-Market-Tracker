import { JewelRepository } from "../../repository/jewel/jewel.repository.js";
import { State } from "../../util/state.js";

class JewelStore {
  #repository = new JewelRepository();

  state = new State({
    updatedAt: "",
    doomfire: [],
    blazing: [],
    status: undefined,
  });

  async fetch() {
    try {
      const { lastUpdatedAt, result, status } = (
        await this.#repository.getJewel()
      ).data;

      const { blazing, doomfire } = result;

      this.state.value = {
        ...this.state.value,
        updatedAt: lastUpdatedAt,
        doomfire,
        blazing,
        status,
      };
    } catch (error) {
      console.log(error);
      this.state.value = {
        ...this.state.value,
        status: "error",
      };
    }
  }
}

export const jewelStore = new JewelStore();
