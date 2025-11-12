import { gem } from "../../data/gem/gem.js";
import { getDate } from "../../utils/date.js";

class GemService {
  async getUncommonGemData() {
    const gemData = await gem.getUncommonGemData();
    const date = getDate();

    const itemList = this.#mappingGemData(gemData.Items);

    return {
      updateTime: date,
      itemList: itemList,
    };
  }

  async getRareGemData() {
    const gemData = await gem.getRareGemData();
    const date = getDate();

    const itemList = this.#mappingGemData(gemData.Items);
    return {
      updateTime: date,
      itemList: itemList,
    };
  }

  async getEpicGemData() {
    const gemData = await gem.getEpicGemData();
    const date = getDate();

    const itemList = this.#mappingGemData(gemData.Items);

    return {
      updateTime: date,
      itemList: itemList,
    };
  }

  #mappingGemData(gemData) {
    const itemList = gemData.map((gem) => {
      if (gem === null) {
        return {
          itemName: "매물이 존재하지 않습니다.",
          image: "",
          price: 0,
          priceDiff: 0,
          priceDiffPercent: "0%",
          grade: "",
        };
      }

      return {
        itemName: gem.Name,
        image: gem.Icon,
        price: gem.CurrentMinPrice,
        priceDiff: 0,
        priceDiffPercent: "0%",
        grade: gem.Grade,
      };
    });

    return itemList;
  }
}

export const gemService = new GemService();
