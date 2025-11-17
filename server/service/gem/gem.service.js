import { GemRepository } from "../../repository/gem/gem.repository.js";

export class GemService {
  #repository;

  constructor() {
    this.#repository = new GemRepository();
  }

  #map(gems) {
    return gems.map((gem) => {
      let priceDiff = 0;
      let priceDiffPercent = "0%";

      return {
        itemName: gem.Name ?? "매물이 존재하지 않습니다.",
        image: gem.Icon ?? "",
        price: gem.CurrentMinPrice ?? 0,
        priceDiff: priceDiff,
        priceDiffPercent: priceDiffPercent,
        grade: gem.Grade,
      };
    });
  }

  async getAll() {
    const grades = ["고급", "희귀", "영웅"];
    const results = await this.#repository.getAll({ grades: grades });

    const [uncommonResult, rareResult, epicResult] = results;

    return {
      uncommonGem: this.#map(uncommonResult.Items),
      rareGem: this.#map(rareResult.Items),
      epicGem: this.#map(epicResult.Items),
    };
  }
}
