import { GemRepository } from "../../repository/gem/gem.repository.js";
import { State } from "../../util/state.js";

export class GemStore {
  #repository = new GemRepository();

  state = new State({
    updatedAt: "",
    uncommonGem: [],
    rareGem: [],
    epicGem: [],
    status: undefined,
  });

  async fetch() {
    try {
      const { lastUpdatedAt, result, status } = (
        await this.#repository.getGem()
      ).data;

      const { uncommonGem, rareGem, epicGem } = result;

      this.state.value = {
        ...this.state.value,
        updatedAt: lastUpdatedAt,
        uncommonGem,
        rareGem,
        epicGem,
        status,
      };
    } catch (error) {
      this.state.value = {
        ...this.state.value,
        status: "error",
      };
    }
  }
}
