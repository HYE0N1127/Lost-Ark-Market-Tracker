import { jewelRepository } from "../../repository/jewel/jewel.repository.js";
import { priceRepository } from "../../repository/price/price.repository.js";
import { getDate } from "../../utils/date.js";

class JewelService {
  async getDoomfireJewelData() {
    const jewelResult = await jewelRepository.getDoomfireJewelData();
    const date = getDate();
    const cheapJewelData = [];

    jewelResult.forEach((jewelData) => {
      console.log(jewelData.Items[0]);
      cheapJewelData.push(jewelData.Items[0]);
    });

    const oldPriceMap = priceRepository.getPriceMap("doomfire");

    const { itemList, newPriceMap } = this.#mappingJewelData(
      cheapJewelData,
      oldPriceMap
    );

    priceRepository.updatePriceMap("doomfire", newPriceMap);

    return {
      updateTime: date,
      itemList: itemList,
    };
  }

  async getBlazingJewelData() {
    const jewelResult = await jewelRepository.getBlazingJewelData();
    const date = getDate();
    const cheapJewelData = [];

    jewelResult.forEach((jewelData) => {
      cheapJewelData.push(jewelData.Items[0]);
    });

    const oldPriceMap = priceRepository.getPriceMap("blazing");

    const { itemList, newPriceMap } = this.#mappingJewelData(
      cheapJewelData,
      oldPriceMap
    );

    priceRepository.updatePriceMap("blazing", newPriceMap);

    return {
      updateTime: date,
      itemList: itemList,
    };
  }

  #mappingJewelData(jewelList, oldPriceMap) {
    const itemList = [];
    const newPriceMap = new Map();

    jewelList.forEach((jewel) => {
      const oldPrice = oldPriceMap.get(jewel.Name) || 0;
      const priceDiff = jewel.AuctionInfo.BuyPrice - oldPrice;
      let priceDiffPercent = "0%";

      if (oldPrice > 0) {
        priceDiffPercent = ((priceDiff / oldPrice) * 100).toFixed(2) + "%";
      } else if (oldPrice === 0 && jewel.AuctionInfo.BuyPrice > 0) {
        priceDiffPercent = "신규";
      }

      console.log(
        "name = " + jewel.Name + "price = " + jewel.AuctionInfo.BuyPrice
      );
      newPriceMap.set(jewel.Name, jewel.AuctionInfo.BuyPrice);

      itemList.push({
        itemName: jewel.Name ?? "매물이 존재하지 않습니다.",
        image: jewel.Icon ?? "",
        price: jewel.AuctionInfo.BuyPrice ?? 0,
        priceDiff: priceDiff,
        priceDiffPercent: priceDiffPercent,
      });
    });

    return { itemList, newPriceMap };
  }
}

export const jewelService = new JewelService();
