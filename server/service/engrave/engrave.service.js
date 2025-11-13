import { engrave } from "../../data/engrave/engrave.js";
import { getDate } from "../../utils/date.js";

class EngraveService {
  async getEngraveData() {
    const engraveData = await engrave.getEngraveData();
    const date = getDate();

    const itemList = engraveData.map((engrave) => {
      return {
        itemName: engrave.Name,
        image: engrave.Icon,
        price: engrave.CurrentMinPrice,
        priceDiff: 0,
        priceDiffPercent: "0%",
      };
    });

    return {
      updateTime: date,
      itemList: itemList,
    };
  }
}

export const engraveService = new EngraveService();
