import { GemRepository } from "../../repository/gem/gem.repository.js";
import { cache } from "../../utils/cache.js";

export class GemService {
  #repository;

  constructor() {
    this.#repository = new GemRepository();
  }

  #map(gems, compare) {
    return gems.map((gem) => {
      let priceDiff = 0;
      let priceDiffPercent = "0.0%";

      const prev = compare.find((data) => data.itemName === gem.Name);

      if (prev) {
        priceDiff = gem.CurrentMinPrice - prev.price;

        if (prev.price > 0) {
          priceDiffPercent = ((priceDiff / prev.price) * 100).toFixed(1) + "%";
        }
      }

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

    const {
      uncommon = [],
      rare = [],
      epic = [],
    } = cache.get("gem")?.result ?? {};

    return {
      uncommonGem: this.#map(uncommonResult.Items, uncommon),
      rareGem: this.#map(rareResult.Items, rare),
      epicGem: this.#map(epicResult.Items, epic),
    };
  }
}
