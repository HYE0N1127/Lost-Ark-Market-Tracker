import { EngraveRepository } from "../../repository/engrave/engrave.repository.js";
import { State } from "../../util/state.js";

class EngraveStore {
  #repository = new EngraveRepository();

  state = new State({
    updateAt: "",
    engrave: [],
    status: undefined,
  });

  async fetch() {
    try {
      const { lastUpdatedAt, result, status } = (
        await this.#repository.getEngrave()
      ).data;

      const { engrave } = result;

      this.state.value = {
        ...this.state.value,
        updatedAt: lastUpdatedAt,
        engrave,
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

export const engraveStore = new EngraveStore();
