import { gemRepository } from "../../repository/gem/gem.repository.js";
import { getDate } from "../../utils/date.js";
import { priceRepository } from "../../repository/price/price.repository.js";

class GemService {
  async getUncommonGemData() {
    const gemData = await gemRepository.getUncommonGemData();
    const date = getDate();

    const oldPriceMap = priceRepository.getPriceMap("uncommonGem");

    const { itemList, newPriceMap } = this.#mappingGemData(
      gemData.Items,
      oldPriceMap
    );

    priceRepository.updatePriceMap("uncommonGem", newPriceMap);

    return {
      updateTime: date,
      itemList: itemList,
    };
  }

  async getRareGemData() {
    const gemData = await gemRepository.getRareGemData();
    const date = getDate();

    const oldPriceMap = priceRepository.getPriceMap("rareGem");

    const { itemList, newPriceMap } = this.#mappingGemData(
      gemData.Items,
      oldPriceMap
    );

    priceRepository.updatePriceMap("rareGem", newPriceMap);

    return {
      updateTime: date,
      itemList: itemList,
    };
  }

  async getEpicGemData() {
    const gemData = await gemRepository.getEpicGemData();
    const date = getDate();

    const oldPriceMap = priceRepository.getPriceMap("epicGem");

    const { itemList, newPriceMap } = this.#mappingGemData(
      gemData.Items,
      oldPriceMap
    );

    priceRepository.updatePriceMap("epicGem", newPriceMap);

    return {
      updateTime: date,
      itemList: itemList,
    };
  }

  #mappingGemData(gemData, oldPriceMap) {
    const itemList = [];
    const newPriceMap = new Map();

    gemData.forEach((gem) => {
      let priceDiff = 0;
      let priceDiffPercent = "0%";

      const oldPrice = oldPriceMap.get(gem.Name) || 0;
      priceDiff = gem.CurrentMinPrice - oldPrice;

      if (oldPrice > 0) {
        priceDiffPercent = ((priceDiff / oldPrice) * 100).toFixed(1) + "%";
      } else if (oldPrice === 0 && gem.CurrentMinPrice > 0) {
        priceDiffPercent = "신규";
      }

      newPriceMap.set(gem.Name, gem.CurrentMinPrice);

      itemList.push({
        itemName: gem.Name ?? "매물이 존재하지 않습니다.",
        image: gem.Icon ?? "",
        price: gem.CurrentMinPrice ?? 0,
        priceDiff: priceDiff,
        priceDiffPercent: priceDiffPercent,
        grade: gem.Grade,
      });
    });

    return { itemList, newPriceMap };
  }
}

export const gemService = new GemService();
