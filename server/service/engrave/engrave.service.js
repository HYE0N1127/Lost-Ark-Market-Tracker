import { engraveRepository } from "../../repository/engrave/engrave.repository.js";

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
    try {
      const result = await engraveRepository.getEngraveData();
      const response = {
        engrave: [],
      };

      const itemList = this.#mapping(result);

      response.engrave = itemList;
      return response;
    } catch (error) {
      console.log(`EngraveService-getAll Error : ${error}`);
    }
  }
}

export const engraveService = new EngraveService();
