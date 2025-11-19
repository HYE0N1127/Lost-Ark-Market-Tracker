import { GemRepository } from "../../repository/gem/gem.repository.js";
import { State } from "../../util/state.js";

export class GemStore {
  #repository = new GemRepository();

  #state = new State({
    updatedAt: String,
    uncommonGem: [],
    rareGem: [],
    epicGem: [],
    status: String,
  });

  get state() {
    return this.#state.value;
  }

  async fetch() {
    const state = this.#state;
    const gems = (await this.#repository.getGem()).data;

    this.#state.value = {
      ...state,
      updatedAt: gems.lastUpdatedAt,
      uncommonGem: gems.result.uncommonGem,
      rareGem: gems.result.rareGem,
      epicGem: gems.result.epicGem,
      status: gems.status,
    };

    console.log(this.#state.value);
  }
}
