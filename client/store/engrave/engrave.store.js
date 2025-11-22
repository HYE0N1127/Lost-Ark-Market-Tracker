import { EngraveRepository } from "../../repository/engrave/engrave.repository.js";
import { State } from "../../util/state.js";

export class EngraveStore {
  #repository = new EngraveRepository();

  state = new State({
    updateAt: "",
    engrave: [],
    status: "",
  });

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
