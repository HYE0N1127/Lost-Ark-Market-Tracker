import {
  blazingJewelArray,
  doomfireJewelArray,
} from "../../constants/jewel.js";
import { JewelRepository } from "../../repository/jewel/jewel.repository.js";
import { cache } from "../../utils/cache.js";

export class JewelService {
  #repository;

  constructor() {
    this.#repository = new JewelRepository();
  }

  #map(jewels, compare) {
    return jewels.map((jewel) => {
      let priceDiff = 0;
      let priceDiffPercent = "0.0%";

      const prev = compare.find((data) => data.itemName === jewel.Name);

      if (prev) {
        priceDiff = jewel.AuctionInfo.BuyPrice - prev.price;

        if (prev.price > 0) {
          priceDiffPercent = ((priceDiff / prev.price) * 100).toFixed(1) + "%";
        }
      }

      return {
        itemName: jewel.Name ?? "매물이 존재하지 않습니다.",
        image: jewel.Icon ?? "",
        price: jewel.AuctionInfo.BuyPrice ?? 0,
        priceDiff: priceDiff,
        priceDiffPercent: priceDiffPercent,
      };
    });
  }

  async getAll() {
    const results = await Promise.all([
      this.#repository.getAll({ names: doomfireJewelArray }),
      this.#repository.getAll({ names: blazingJewelArray }),
    ]);

    const [doomfireJewels, blazingJewels] = results;

    const { doomfire = [], blazing = [] } = cache.get("jewel")?.result ?? {};

    return {
      doomfire: this.#map(doomfireJewels, doomfire),
      blazing: this.#map(blazingJewels, blazing),
    };
  }
}
