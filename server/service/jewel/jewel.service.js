import {
  blazingJewelArray,
  doomfireJewelArray,
} from "../../constants/jewel.js";
import { JewelRepository } from "../../repository/jewel/jewel.repository.js";

export class JewelService {
  #repository;

  constructor() {
    this.#repository = new JewelRepository();
  }

  #map(jewels) {
    return jewels.map((jewel) => {
      if (!jewel || !jewel.AuctionInfo || !jewel.Name) {
        return {
          itemName: "매물이 존재하지 않습니다.",
          image: "",
          price: 0,
          priceDiff: 0,
          priceDiffPercent: "0%",
        };
      }

      return {
        itemName: jewel.Name,
        image: jewel.Icon ?? "",
        price: jewel.AuctionInfo.BuyPrice ?? 0,
        priceDiff: 0,
        priceDiffPercent: "0%",
      };
    });
  }

  async getAll() {
    const results = await Promise.all([
      this.#repository.getAll({ names: doomfireJewelArray }),
      this.#repository.getAll({ names: blazingJewelArray }),
    ]);

    const [doomfireJewels, blazingJewels] = results;

    return {
      doomfire: this.#map(doomfireJewels),
      blazing: this.#map(blazingJewels),
    };
  }
}
