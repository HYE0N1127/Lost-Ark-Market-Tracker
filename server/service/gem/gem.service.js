import { gem } from "../../data/gem/gem.js";
import { getDate } from "../../utils/date.js";
import { priceService } from "../price/price.service.js";

class GemService {
  async getUncommonGemData() {
    const gemData = await gem.getUncommonGemData();
    const date = getDate();

    const oldPriceMap = priceService.getPriceMap("uncommonGem");

    const { itemList, newPriceMap } = this.#mappingGemData(
      gemData.Items,
      oldPriceMap
    );

    priceService.updatePriceMap("uncommonGem", newPriceMap);

    return {
      updateTime: date,
      itemList: itemList,
    };
  }

  async getRareGemData() {
    const gemData = await gem.getRareGemData();
    const date = getDate();

    const oldPriceMap = priceService.getPriceMap("rareGem");

    const { itemList, newPriceMap } = this.#mappingGemData(
      gemData.Items,
      oldPriceMap
    );

    priceService.updatePriceMap("rareGem", newPriceMap);

    return {
      updateTime: date,
      itemList: itemList,
    };
  }

  async getEpicGemData() {
    const gemData = await gem.getEpicGemData();
    const date = getDate();

    const oldPriceMap = priceService.getPriceMap("epicGem");

    const { itemList, newPriceMap } = this.#mappingGemData(
      gemData.Items,
      oldPriceMap
    );

    priceService.updatePriceMap("epicGem", newPriceMap);

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
