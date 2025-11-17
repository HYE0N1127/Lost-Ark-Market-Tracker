import { engraveRepository } from "../../repository/engrave/engrave.repository.js";
import { jewelRepository } from "../../repository/jewel/jewel.repository.js";

class EngraveService {
  #mapping(engraveData) {
    const itemList = [];

    engraveData.forEach((engrave) => {
      let priceDiff = 0;
      let priceDiffPercent = "0%";

      itemList.push({
        itemName: engrave.Name ?? "매물이 존재하지 않습니다.",
        image: engrave.Icon ?? "",
        price: engrave.CurrentMinPrice ?? 0,
        priceDiff: priceDiff,
        priceDiffPercent: priceDiffPercent,
      });
    });

    return itemList;
  }

  async getAll() {
    const result = await engraveRepository.getAll();

    console.log(result);

    return {
      engrave: this.#mapping(result),
    };
  }
}

export const engraveService = new EngraveService();
