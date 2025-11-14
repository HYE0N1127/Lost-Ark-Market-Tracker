import { engrave } from "../../data/engrave/engrave.js";
import { getDate } from "../../utils/date.js";
import { priceService } from "../price/price.service.js";

class EngraveService {
  async getEngraveData() {
    const engraveData = await engrave.getEngraveData();
    const date = getDate();

    const oldPriceMap = priceService.getPriceMap("engrave");

    const { itemList, newPriceMap } = this.#mappingEngraveData(
      engraveData,
      oldPriceMap
    );

    priceService.updatePriceMap("engrave", newPriceMap);

    return {
      updateTime: date,
      itemList: itemList,
    };
  }

  #mappingEngraveData(engraveData, oldPriceMap) {
    const itemList = [];
    const newPriceMap = new Map();

    engraveData.forEach((engrave) => {
      let priceDiff = 0;
      let priceDiffPercent = "0%";

      const oldPrice = oldPriceMap.get(engrave.Name) || 0;
      priceDiff = engrave.CurrentMinPrice - oldPrice;

      if (oldPrice > 0) {
        priceDiffPercent = ((priceDiff / oldPrice) * 100).toFixed(2) + "%";
      } else if (oldPrice === 0 && engrave.CurrentMinPrice > 0) {
        priceDiffPercent = "신규";
      }

      newPriceMap.set(engrave.Name, engrave.CurrentMinPrice);

      itemList.push({
        itemName: engrave.Name ?? "매물이 존재하지 않습니다.",
        image: engrave.Icon ?? "",
        price: engrave.CurrentMinPrice ?? 0,
        priceDiff: priceDiff,
        priceDiffPercent: priceDiffPercent,
      });
    });

    return { itemList, newPriceMap };
  }
}

export const engraveService = new EngraveService();
