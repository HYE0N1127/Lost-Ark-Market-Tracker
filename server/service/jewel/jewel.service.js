import {
  blazingJewelArray,
  doomfireJewelArray,
} from "../../constants/jewel.js";
import { jewelRepository } from "../../repository/jewel/jewel.repository.js";

class JewelService {
  #mapping(cheapJewelData) {
    return cheapJewelData.map((jewel) => {
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
      jewelRepository.getAll({ names: doomfireJewelArray }),
      jewelRepository.getAll({ names: blazingJewelArray }),
    ]);

    const [doomfireResult, blazingResult] = results;

    return {
      doomfire: this.#mapping(doomfireResult),
      blazing: this.#mapping(blazingResult),
    };
  }
}

export const jewelService = new JewelService();
