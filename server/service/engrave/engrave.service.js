import { EngraveRepository } from "../../repository/engrave/engrave.repository.js";
import { cache } from "../../utils/cache.js";

export class EngraveService {
  #repository;

  constructor() {
    this.#repository = new EngraveRepository();
  }

  #map(engraveData) {
    const cached = cache.get("engrave");

    return engraveData.map((engrave) => {
      let priceDiff = 0;
      let priceDiffPercent = "신규";

      if (cached) {
        const prev = cached.result.engrave.find(
          (data) => data.itemName === engrave.Name
        );

        priceDiff = engrave.CurrentMinPrice - prev.price;

        if (prev.price > 0) {
          priceDiffPercent = ((priceDiff / prev.price) * 100).toFixed(1) + "%";
        }
      }

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
