import { jewelRepository } from "../../repository/jewel/jewel.repository.js";

class JewelService {
  #mapItems(cheapJewelData) {
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
    const promises = [
      jewelRepository.getDoomfireJewelData(),
      jewelRepository.getBlazingJewelData(),
    ];

    const results = await Promise.allSettled(promises);

    const response = {
      doomfire: [],
      blazing: [],
    };

    if (results[0].status === "fulfilled") {
      const jewelResult = results[0].value;
      const cheapJewelData = jewelResult.map((data) => data.Items[0]);

      response.doomfire = this.#mapItems(cheapJewelData);
    } else {
      console.error("Failed to fetch Doomfire data:", results[0].reason);
    }

    if (results[1].status === "fulfilled") {
      const jewelResult = results[1].value;

      const cheapJewelData = jewelResult.map((data) => data.Items[0]);

      response.blazing = this.#mapItems(cheapJewelData);
    } else {
      console.error("Failed to fetch Blazing data:", results[1].reason);
    }

    return response;
  }
}

export const jewelService = new JewelService();
