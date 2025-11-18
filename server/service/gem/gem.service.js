import { GemRepository } from "../../repository/gem/gem.repository.js";
import { cache } from "../../utils/cache.js";

export class GemService {
  #repository;

  constructor() {
    this.#repository = new GemRepository();
  }
  #findCachedGem(type, gem) {
    const cached = cache.get("gem")?.result;

    if (!cached) {
      return;
    }

    switch (type) {
      case "uncommon":
        return cached.uncommonGem.find((data) => data.itemName === gem.Name);
      case "rare":
        return cached.rareGem.find((data) => data.itemName === gem.Name);
      case "epic":
        return cached.epicGem.find((data) => data.itemName === gem.Name);
      default:
        return cached.uncommonGem.find((data) => data.itemName === gem.Name);
    }
  }

  #map(gems, type) {
    return gems.map((gem) => {
      let priceDiff = 0;
      let priceDiffPercent = "신규";

      const prev = this.#findCachedGem(type, gem);

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

    // 구조 분해 할당
    const [uncommonResult, rareResult, epicResult] = results;

    return {
      uncommonGem: this.#map(uncommonResult.Items, "uncommon"),
      rareGem: this.#map(rareResult.Items, "rare"),
      epicGem: this.#map(epicResult.Items, "epic"),
    };
  }
}
