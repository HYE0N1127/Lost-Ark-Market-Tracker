import { State } from "../../util/state.js";

export class JewelStore {
  #repository;

  #state = new State({
    updatedAt: String,
    doomfire: [],
    blazing: [],
    status: String,
  });

  constructor(repository) {
    this.#repository = repository;
  }

  get state() {
    return this.#state.value;
  }

  async fetch() {
    const state = this.#state;
    const jewels = (await this.#repository.getJewel()).data;

    this.#state.value = {
      ...state,
      updatedAt: jewels.lastUpdatedAt,
      doomfire: jewels.result.doomfire,
      blazing: jewels.result.blazing,
      status: String,
    };
  }
}
