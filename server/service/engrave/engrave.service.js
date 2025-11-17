import { EngraveRepository } from "../../repository/engrave/engrave.repository.js";

export class EngraveService {
  #repository;

  constructor() {
    this.#repository = new EngraveRepository();
  }

  #map(engraveData) {
    return engraveData.map((engrave) => {
      let priceDiff = 0;
      let priceDiffPercent = "0%";

      return {
        itemName: engrave.Name ?? "매물이 존재하지 않습니다.",
        image: engrave.Icon ?? "",
        price: engrave.CurrentMinPrice ?? 0,
        priceDiff: priceDiff,
        priceDiffPercent: priceDiffPercent,
      };
    });
  }

  async getAll() {
    const result = await this.#repository.getAll();

    return {
      engrave: this.#map(result),
    };
  }
}
