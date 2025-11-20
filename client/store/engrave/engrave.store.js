import { State } from "../../util/state.js";

export class EngraveStore {
  #repository;

  state = new State({
    updateAt: String,
    engrave: [],
    status: String,
  });

  constructor(repository) {
    this.#repository = repository;
  }

  async fetch() {
    const state = this.state;
    const engraves = (await this.#repository.getEngrave()).data;

    this.state.value = {
      ...state,
      updatedAt: engraves.lastUpdatedAt,
      engrave: engraves.result.engrave,
    };
  }
}
