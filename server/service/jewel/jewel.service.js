import { jewel } from "../../data/jewel/jewel.js";
import { getDate } from "../../utils/date.js";

class JewelService {
  async getDoomfireJewelData() {
    const jewelResult = await jewel.getDoomfireJewelData();
    const date = getDate();
    const cheapJewelData = [];

    jewelResult.forEach((jewelData) => {
      cheapJewelData.push(jewelData.Items[0]);
    });

    return {
      updateTime: date,
      itemList: this.#mappingJewelData(cheapJewelData),
    };
  }

  async getBlazingJewelData() {
    const jewelResult = await jewel.getBlazingJewelData();
    const date = getDate();
    const cheapJewelData = [];

    jewelResult.forEach((jewelData) => {
      cheapJewelData.push(jewelData.Items[0]);
    });

    return {
      updateTime: date,
      itemList: this.#mappingJewelData(cheapJewelData),
    };
  }

  #mappingJewelData(jewelList) {
    const itemList = jewelList.map((jewel) => {
      if (jewel === null) {
        return {
          itemName: "매물이 존재하지 않습니다.",
          price: 0,
          priceDiff: 0,
          priceDiffPercent: "0%",
        };
      }

      return {
        itemName: jewel.Name,
        image: jewel.Icon,
        price: jewel.CurrentMinPrice,
        priceDiff: 0,
        priceDiffPercent: "0%",
      };
    });

    return itemList;
  }
}

export const jewelService = new JewelService();
